import React, { useState, useEffect } from 'react';
import { initializeEthereum } from '../utils/etherum';

function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
        setUserAddress(accounts[0]);
      }
    }
  }

  async function connectWallet() {
    const connected = await initializeEthereum();
    if (connected) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setIsConnected(true);
      setUserAddress(accounts[0]);
    }
  }

  return (
    <div className="fixed top-0 right-0 m-4">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
        </div>
      )}
    </div>
  );
}

export default WalletConnection;

