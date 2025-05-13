import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const WALLET_ADDRESS = "6KPYDyuRnpuKcm1TerUmwLd2BcaihvhF4Ccrr8beruu2"; //👈 Replace with your wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL

(async () => {
  console.log(`Requesting airdrop for ${WALLET_ADDRESS}`);

  const signature = await connection.requestAirdrop(
    new PublicKey(WALLET_ADDRESS),
    AIRDROP_AMOUNT
  );

  console.log(
    `Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
})();
