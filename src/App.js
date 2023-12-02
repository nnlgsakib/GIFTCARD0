import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Heading } from '@chakra-ui/react';
import GiftCardComponent from './components/createcard';
import RedeemCardComponent from './components/redeemcard';



const App = () => {
  return (
    <ChakraProvider>
      <GiftCardComponent />
      <RedeemCardComponent />
    </ChakraProvider>
  );
};

export default App;
