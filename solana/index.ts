import {
  NATIVE_MINT,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createSyncNativeInstruction,
  getAccount,
  createTransferInstruction,
  createCloseAccountInstruction,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

// 1.申请空投
async function requestAirdrop(
  connection: Connection,
  wallet: Keypair
): Promise<void> {
  const airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    2 * LAMPORTS_PER_SOL
  );

  while (true) {
    const { value: statues } = await connection.getSignatureStatuses([
      airdropSignature,
    ]);

    if (!statues || statues.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    if (
      (statues[0] && statues[0].confirmationStatus === "confirmed") ||
      statues[0]?.confirmationStatus === "finalized"
    ) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("✅ - Step 1: Airdrop completed");
}

// 2. 包装SOL
async function wrapSol(
  connection: Connection,
  wallet: Keypair
): Promise<PublicKey> {
  const associatedTokenAccount = await getAssociatedTokenAddress(
    NATIVE_MINT,
    wallet.publicKey
  );

  const wrapTransaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      associatedTokenAccount,
      wallet.publicKey,
      NATIVE_MINT
    ),
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: associatedTokenAccount,
      lamports: LAMPORTS_PER_SOL,
    }),
    createSyncNativeInstruction(associatedTokenAccount)
  );

  await sendAndConfirmTransaction(connection, wrapTransaction, [wallet]);
  console.log("✅ - Step 2: SOL wrapped");
  return associatedTokenAccount;
}

// 3.转移包装的 SOL
async function transferWrappedSol(
  connection: Connection,
  fromWallet: Keypair,
  toWallet: Keypair,
  fromTokenAccount: PublicKey
): Promise<PublicKey> {
  const toTokenAccount = await getAssociatedTokenAddress(
    NATIVE_MINT,
    toWallet.publicKey
  );

  const transferTransaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      fromWallet.publicKey,
      toTokenAccount,
      toWallet.publicKey,
      NATIVE_MINT
    ),
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromWallet.publicKey,
      LAMPORTS_PER_SOL / 2
    )
  );
  await sendAndConfirmTransaction(connection, transferTransaction, [
    fromWallet,
  ]);

  console.log("✅ - Step 3: Transferred wrapped SOL");
  return toTokenAccount;
}

// 4. 解开 SOL
async function unwrapSol(
  connection: Connection,
  wallet: Keypair,
  toTokenAccount: PublicKey
): Promise<void> {
  const unwrapTransaction = new Transaction().add(
    createCloseAccountInstruction(
      toTokenAccount,
      wallet.publicKey,
      wallet.publicKey
    )
  );

  await sendAndConfirmTransaction(connection, unwrapTransaction, [wallet]);
  console.log("✅ - Step 4: SOL unwrapped");
}

async function printBalances(
  connection: Connection,
  wallet1: Keypair,
  wallet2: Keypair,
  tokenAccount2: PublicKey
): Promise<void> {
  const [wallet1Balance, wallet2Balance, tokenAccount2Info] = await Promise.all(
    [
      connection.getBalance(wallet1.publicKey),
      connection.getBalance(wallet2.publicKey),
      connection.getTokenAccountBalance(tokenAccount2),
    ]
  );

  console.log(`- Wallet 1 SOL balance: ${wallet1Balance / LAMPORTS_PER_SOL}`);
  console.log(`- Wallet 2 SOL balance: ${wallet2Balance / LAMPORTS_PER_SOL}`);
  console.log(
    `- Wallet 2 wrapped SOL: ${
      Number(tokenAccount2Info.value.amount) / LAMPORTS_PER_SOL
    }`
  );
}

async function main() {
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  const wallet1 = Keypair.generate();
  const wallet2 = Keypair.generate();

  await requestAirdrop(connection, wallet1);

  const tokenAccount1 = await wrapSol(connection, wallet1);
  const tokenAccount2 = await transferWrappedSol(
    connection,
    wallet1,
    wallet2,
    tokenAccount1
  );

  await unwrapSol(connection, wallet1, tokenAccount1);
  await printBalances(connection, wallet1, wallet2, tokenAccount2);
}

main().catch(console.error);
