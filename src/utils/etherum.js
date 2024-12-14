import { ethers } from 'ethers';
const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "string", "name": "date", "type": "string" }
    ],
    "name": "createEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listAll",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" }
    ],
    "name": "registerEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" }
    ],
    "name": "listAttendees",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]




const contractAddress = "0xe0f4d40186c8b3bba158ba9d8425c165bcfa8bab"; // Replace with your actual contract address
const arbitrumTestnetChainId = '0x66eee'; // Chain ID for Arbitrum Testnet (421614 in hex)

let provider;
let signer;
let contract;
export let address;

export async function initializeEthereum() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Check if we're on the correct network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== 421614) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: arbitrumTestnetChainId }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x66eee',
                chainName: 'Arbitrum Sepolia',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
                blockExplorerUrls: ['https://sepolia.arbiscan.io/']
              }],
            });
          } else {
            throw switchError;
          }
        }
      }
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      address = await signer.getAddress();

      return true;
    } catch (error) {
      console.error("User denied account access or another error occurred:", error);
      return false;
    }
  } else {
    console.log('Please install MetaMask!');
    return false;
  }
}

export async function createEvent(title, description, date) {
  if (!contract) await initializeEthereum();
  const tx = await contract.createEvent(title, description, date);
  await tx.wait();
}

export async function listAllEvents() {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.listAll();
  const data = jsonData.replace(",]", "]");
  console.log(data);
  return JSON.parse(data);
}

export async function getEvent(id) {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.getEvent(id);
  console.log(jsonData);
  return JSON.parse(jsonData);
}

export async function registerForEvent(id, name) {
  if (!contract) await initializeEthereum();
  const tx = await contract.registerEvent(id, name);
  await tx.wait();
}

export async function listAttendees(id) {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.listAttendees(id);
  console.log(jsonData.replace(",]", "]"));
  return JSON.parse(jsonData.replace(",]", "]"));
}

