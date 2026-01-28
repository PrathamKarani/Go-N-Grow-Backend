export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wallet } = req.body;

  if (!wallet || !wallet.startsWith("0x") || wallet.length !== 42) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  console.log("🎃 Mint request received for wallet:", wallet);

  // Fake mint success
  return res.status(200).json({
    success: true,
    message: "Rare Pumpkin NFT minted (fake)",
    tokenId: Math.floor(Math.random() * 1_000_000)
  });
}
