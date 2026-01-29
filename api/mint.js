import { mintRareNFT } from "../scripts/mintNFT.js"; // adjust path if needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { wallet } = req.body;

  if (!wallet || !wallet.startsWith("0x") || wallet.length !== 42) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  console.log("🎃 Mint request received for wallet:", wallet);

  try {
    // Call the real mint function
    const txHash = await mintRareNFT(wallet);

    return res.status(200).json({
      success: true,
      message: "Rare Pumpkin NFT minted!",
      txHash
    });
  } catch (err) {
    console.error("Error in API mint:", err);
    return res.status(500).json({ error: "Minting failed", details: err.message });
  }
}
