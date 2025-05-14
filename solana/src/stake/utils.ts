import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
  StakeProgram,
  Authorized,
} from "@solana/web3.js";

import type {
  TransactionSignature,
  TransactionConfirmationStatus,
  SignatureStatus,
} from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899", "confirmed");

async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  desiredConfirmationStatus: TransactionConfirmationStatus = "confirmed",
  timeout: number = 30000,
  pollInterval: number = 1000,
  searchTransactionHistory: boolean = false
): Promise<SignatureStatus> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const { value: statuses } = await connection.getSignatureStatuses(
      [signature],
      { searchTransactionHistory }
    );

    const status = statuses[0];

    if (status === null) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      continue;
    }

    if (status.err) {
      throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
    }

    if (
      status.confirmationStatus &&
      status.confirmationStatus === desiredConfirmationStatus
    ) {
      return status;
    }

    if (status.confirmationStatus === "finalized") {
      return status;
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }
  throw new Error(`Transaction confirmation timeout after ${timeout}ms`);
}

export async function fundAccount(
  accountToFund: Keypair,
  lamports = LAMPORTS_PER_SOL
) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  try {
    const signature = await connection.requestAirdrop(
      accountToFund.publicKey,
      lamports
    );

    const result = await confirmTransaction(connection, signature, "finalized");

    if (result.err) {
      throw new Error(`Failed to confirm airdrop: ${result.err}`);
    }

    console.log("Wallet funded", signature);
  } catch (e) {
    console.log(e);
  }

  return;
}

export async function createStakeAccount({
  wallet,
  stakeAccount,
  lamports,
}: {
  wallet: Keypair;
  stakeAccount: Keypair;
  lamports?: number;
}) {
  const transaction = StakeProgram.createAccount({
    fromPubkey: wallet.publicKey,
    stakePubkey: stakeAccount.publicKey,
    authorized: new Authorized(wallet.publicKey, wallet.publicKey),
    lamports: lamports ?? LAMPORTS_PER_SOL,
  });

  try {
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.sign(wallet, stakeAccount);

    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );
    const result = await confirmTransaction(connection, signature, "finalized");

    if (result.err) {
      throw new Error(`Failed to confirm airdrop: ${result.err}`);
    }
    console.log("Stake Account created", signature);
  } catch (e) {
    console.error(e);
  }
  return;
}

export async function delegateStakeAccount({
  stakeAccount,
  validatorVoteAccount,
  authorized,
}: {
  stakeAccount: Keypair;
  validatorVoteAccount: PublicKey;
  authorized: Keypair;
}) {
  const transaction = StakeProgram.delegate({
    stakePubkey: stakeAccount.publicKey,
    authorizedPubkey: authorized.publicKey,
    votePubkey: validatorVoteAccount,
  });

  try {
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    transaction.feePayer = authorized.publicKey;
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.sign(authorized);

    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    const result = await confirmTransaction(connection, signature, "finalized");
    if (result.err) {
      throw new Error(`Failed to confirm airdrop: ${result.err}`);
    }
    console.log("Stake Account delegated to vote account", signature);
  } catch (e) {
    console.error(e);
  }
}

export async function getStakeAccountInfo(stakeAccount: PublicKey) {
  try {
    const info = await connection.getAccountInfo(stakeAccount);

    console.log(`Stake account exists.`);
    console.log(info);
  } catch (e) {
    console.error(e);
  }
}
