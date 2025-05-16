import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// BD9q9GhsZ7RzV3ZxpuiXnAdQVLzbQtUBjcVnALkrcaZq

const secret = [
  101, 212, 51, 232, 127, 144, 181, 67, 215, 69, 150, 205, 166, 96, 56, 188,
  235, 18, 200, 111, 178, 14, 224, 88, 101, 121, 86, 27, 37, 26, 110, 93, 151,
  177, 210, 185, 9, 79, 82, 19, 103, 104, 230, 218, 170, 50, 138, 50, 241, 248,
  98, 144, 216, 83, 4, 112, 132, 12, 193, 115, 150, 230, 68, 188,
];
const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));

const connection = new Connection("https://api.devnet.solana.com ");

async function logMemo(message: string) {
  // 1. Create Solana Transaction
  const tx = new Transaction();

  // 2. Add Memo Instruction
  await tx.add(
    new TransactionInstruction({
      keys: [
        { pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true },
      ],
      data: Buffer.from(message, "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  );

  // 3. Send Transaction
  const result = await sendAndConfirmTransaction(connection, tx, [fromKeypair]);

  // 4. Log Tx URL
  console.log(
    "complete: ",
    `https://explorer.solana.com/tx/${result}?cluster=devnet`
  );
  return result;
}

async function fetchMemo() {
  const wallet = fromKeypair.publicKey;
  const signatureDetail = await connection.getSignaturesForAddress(wallet);
  console.log("Fetched Memo: ", signatureDetail[0].memo);
}

// logMemo("QuickNode Memo Guide Test");

fetchMemo()
