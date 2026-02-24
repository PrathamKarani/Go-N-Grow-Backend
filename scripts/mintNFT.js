import { ethers } from "ethers";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

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

export async function mintRareNFT(toAddress) {
  try {
    const tx = await contract.mintRarePumpkin(toAddress);
    const receipt = await tx.wait();
    return tx.hash;
  } catch (err) {
    console.error("Mint error:", err);
    throw err; // important so API returns proper error
  }
}