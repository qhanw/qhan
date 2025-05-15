import { Connection } from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899", "confirmed");

(async () => {
  const version = await connection.getVersion();
  console.log("Connection to cluster established:", version);
  const epoch = await connection.getEpochInfo();
  console.log("Epoch info", epoch);
})();
