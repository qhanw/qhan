const HELIUS_ENDPOINT =
  "https://mainnet.helius-rpc.com/?api-key=9fa4cda4-2fba-4260-8853-c034d7051646";

export async function fetchTransaction(
  tx: string,
  encoding?: "json" | "jsonParsed"
) {
  const response = await fetch(HELIUS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "getTransaction",
      params: [
        tx,
        { maxSupportedTransactionVersion: 0, encoding: encoding ?? "json" },
      ],
    }),
  });
  return await response.json();
}
