import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

const RPC = "https://api.mainnet-beta.solana.com";
const connect = new Connection(RPC);
const WALLET_ADDRESS = "73H7nPuVoLTUH8ajceo5Qx4F8u68Wck5UjF1xJJnyS7o";

(async () => {
  let balance = await connect.getBalance(new PublicKey(WALLET_ADDRESS));
  console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`);
})();
