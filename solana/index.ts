// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   clusterApiUrl,
// } from "@solana/web3.js";

// const RPC = "https://api.mainnet-beta.solana.com";
// const connect = new Connection(RPC);
// const WALLET_ADDRESS = "73H7nPuVoLTUH8ajceo5Qx4F8u68Wck5UjF1xJJnyS7o";

// (async () => {
//   let balance = await connect.getBalance(new PublicKey(WALLET_ADDRESS));
//   console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`);
// })();

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const SOLANA_CONNECTION = new Connection(clusterApiUrl("devnet"));
const WALLET_ADDRESS = "6KPYDyuRnpuKcm1TerUmwLd2BcaihvhF4Ccrr8beruu2"; //👈 Replace with your wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL

(async () => {
  console.log(`Requesting airdrop for ${WALLET_ADDRESS}`);

  const signature = await SOLANA_CONNECTION.requestAirdrop(
    new PublicKey(WALLET_ADDRESS),
    AIRDROP_AMOUNT
  );

  console.log(
    `Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
})();
