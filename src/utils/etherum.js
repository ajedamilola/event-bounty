import { ethers } from 'ethers';

const contractABI = [
  "function createEvent(string calldata title, string calldata description, string calldata date) external",
  "function listAll() external view returns (string memory)",
  "function getEvent(uint256 id) external view returns (string memory)",
  "function registerEvent(uint256 id, string calldata name) external",
  "function listAttendees(uint256 id) external view returns (string memory)"
];

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your actual contract address
const arbitrumTestnetChainId = '0x66eee'; // Chain ID for Arbitrum Testnet (421614 in hex)

let provider;
let signer;
let contract;

export async function initializeEthereum() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Check if we're on the correct network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== arbitrumTestnetChainId) {
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
                chainId: arbitrumTestnetChainId,
                chainName: 'Arbitrum Testnet',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
                blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io']
              }],
            });
          } else {
            throw switchError;
          }
        }
      }

      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
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
  const jsonData = JSON.stringify({ title, description, date });
  const tx = await contract.createEvent(jsonData);
  await tx.wait();
}

export async function listAllEvents() {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.listAll();
  return JSON.parse(jsonData);
}

export async function getEvent(id) {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.getEvent(id);
  return JSON.parse(jsonData);
}

export async function registerForEvent(id, name) {
  if (!contract) await initializeEthereum();
  const jsonData = JSON.stringify({ name });
  const tx = await contract.registerEvent(id, jsonData);
  await tx.wait();
}

export async function listAttendees(id) {
  if (!contract) await initializeEthereum();
  const jsonData = await contract.listAttendees(id);
  return JSON.parse(jsonData);
}
