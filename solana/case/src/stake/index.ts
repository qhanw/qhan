import {
  Connection,
  PublicKey,
  Keypair,
  StakeProgram,
  LAMPORTS_PER_SOL,
  TransactionSignature,
} from "@solana/web3.js";

import type {
  SignatureStatus,
  TransactionConfirmationStatus,
} from "@solana/web3.js";

import {
  fundAccount,
  createStakeAccount,
  delegateStakeAccount,
  getStakeAccountInfo,
} from "./utils";
import walletSecret from "./wallet.json";

const wallet = Keypair.fromSecretKey(new Uint8Array(walletSecret));
const stakeAccount = Keypair.generate();
const validatorVoteAccount = new PublicKey("HaJAKDL3tffeiWPLAre8c6Aterhwh4VuMa9nFPHEJJLQ");

async function main() {
  try {
    // Step 1 - Fund the wallet
    console.log("---Step 1---Funding wallet");
    await fundAccount(wallet, 2 * LAMPORTS_PER_SOL);

    // Step 2 - Create the stake account
    console.log("---Step 2---Create Stake Account");
    await createStakeAccount({
      wallet,
      stakeAccount,
      lamports: 1.9 * LAMPORTS_PER_SOL,
    });

    // Step 3 - Delegate the stake account
    console.log("---Step 3---Delegate Stake Account");
    await delegateStakeAccount({
      stakeAccount,
      validatorVoteAccount,
      authorized: wallet,
    });

    // Step 4 - Check the stake account
    console.log("---Step 4---Check Stake Account");
    await getStakeAccountInfo(stakeAccount.publicKey);
  } catch (e) {
    console.error(e);
    return;
  }
}

main();
