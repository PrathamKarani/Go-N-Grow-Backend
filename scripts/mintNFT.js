require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Load contract ABI (from Hardhat artifacts)
const abi = JSON.parse(fs.readFileSync("./abis/RarePumpkin.json")).abi;

// Connect to network
const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);

// Create wallet signer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Connect to contract
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

async function mintRareNFT(toAddress) {
    try {
        const tx = await contract.mintRarePumpkin(toAddress);
        console.log("Transaction sent! Hash:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction confirmed! Block number:", receipt.blockNumber);
    } catch (err) {
        console.error("Error minting NFT:", err);
    }
}

// Example usage
mintRareNFT("0xYourTestWalletAddressHere");
