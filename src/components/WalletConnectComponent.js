import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Text, ChakraProvider } from '@chakra-ui/react'; // Make sure ChakraProvider, Button, and Text are imported

const WalletConnectComponent = ({ setAccount }) => {
  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount(signer);
    } catch (error) {
      console.error('Error connecting wallet:', error.message || error);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAccount(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error.message || error);
    }
  };

  return (
    <ChakraProvider>
      {setAccount ? ( // Change 'account' to 'setAccount'
        <div>
          <Text>Connected Wallet Address: {setAccount.address}</Text>
          <Button colorScheme="red" onClick={disconnectWallet} mt="2">
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button colorScheme="teal" onClick={connectWallet} mb="4">
          Connect Wallet
        </Button>
      )}
    </ChakraProvider>
  );
};

export default WalletConnectComponent;
