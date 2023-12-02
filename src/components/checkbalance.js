import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
  Spinner,
  ChakraProvider,
  Text,
} from '@chakra-ui/react';
import { giftcardABI, giftcard ,mind_rpc} from '../const';

const CheckBalanceComponent = () => {
  const [contract, setContract] = useState(null);
  const [cardId, setCardId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        
        const rpcUrl = mind_rpc;
        
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const newContract = new ethers.Contract(giftcard, giftcardABI, provider);

        setContract(newContract);
      } catch (error) {
        console.error('Error initializing contract:', error.message || error);
        setError('Error initializing contract. Please try again.');
      }
    };

    initContract();
  }, []);

  const checkGiftCardBalance = async () => {
    try {
      setError('');
      setBalance(null);

      // Validate card ID
      if (!cardId) {
        throw new Error('Please enter a valid card ID.');
      }

      // Check if contract is initialized
      if (!contract) {
        throw new Error('Contract not initialized. Please try again.');
      }

      // Call the getGiftCardBalanceAndStatus function on the contract
      const [depositAmount, redeemed] = await contract.getGiftCardBalanceAndStatus(cardId);
      setBalance(depositAmount);

      console.log('Gift Card balance checked successfully:', depositAmount);
    } catch (error) {
      console.error('Error checking gift card balance:', error.message || error);
      setError(
        error.message || 'An error occurred while checking the gift card balance.'
      );
    }
  };

  return (
    <ChakraProvider>
      <Box maxW="400px" m="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg">
        <Heading mb="4">Check Gift Card Balance</Heading>
        {error && (
          <Alert status="error" mb="4">
            <AlertIcon />
            {error}
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
          </Alert>
        )}
        <FormControl mb="4">
          <FormLabel>Card ID:</FormLabel>
          <Input
            type="number"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            placeholder="Enter card ID"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={checkGiftCardBalance} isLoading={loading} loadingText="Checking...">
          Check Gift Card Balance
        </Button>

        {balance !== null && (
          <Box mt="4">
            <Text>Gift Card Balance: {ethers.utils.formatEther(balance)} MIND</Text>
          </Box>
        )}

        {loading && (
          <Box mt="4" textAlign="center">
            <Spinner size="lg" color="teal.500" />
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default CheckBalanceComponent;
