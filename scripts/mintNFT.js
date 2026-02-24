require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Load ABI safely
const abi = JSON.parse(
  fs.readFileSync(path.join(__dirname, "abis", "RarePumpkin.json"))
).abi;

const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

async function mintRareNFT(toAddress) {
  try {
    const tx = await contract.mintRarePumpkin(toAddress);
    const receipt = await tx.wait();
    return tx.hash;
  } catch (err) {
    console.error("Mint error:", err);
    throw err;
  }
}

module.exports = { mintRareNFT };