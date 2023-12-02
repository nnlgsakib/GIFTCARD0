import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Heading } from '@chakra-ui/react';
import GiftCardComponent from './components/createcard';
import RedeemCardComponent from './components/redeemcard';
import CheckBalanceComponent from './components/checkbalance';



const App = () => {
  return (
    <ChakraProvider>
      <GiftCardComponent />
      <RedeemCardComponent />
      <CheckBalanceComponent />
    </ChakraProvider>
  );
};

export default App;
