import React from 'react';
import { Button } from '@chakra-ui/react';

const ConnectWalletButton = ({ connectWallet }) => {
  return (
    <Button colorScheme="teal" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
