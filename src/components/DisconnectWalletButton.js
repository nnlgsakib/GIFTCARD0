import React from 'react';
import { Button } from '@chakra-ui/react';

const DisconnectWalletButton = ({ disconnectWallet }) => {
  return (
    <Button colorScheme="teal" onClick={disconnectWallet}>
      Disconnect Wallet
    </Button>
  );
};

export default DisconnectWalletButton;
