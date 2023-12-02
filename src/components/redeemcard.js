import React, { useEffect, useState } from 'react';
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
import { giftcardABI, giftcard } from '../const';

const GiftCardRedeemComponent = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [cardId, setCardId] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const initEthers = async () => {
      try {
        const ethereum = window.ethereum;
        if (ethereum) {
          await ethereum.request({ method: 'eth_requestAccounts' });
          const newProvider = new ethers.providers.Web3Provider(ethereum);
          const signer = newProvider.getSigner();

          const newContract = new ethers.Contract(giftcard, giftcardABI, signer);

          setProvider(newProvider);
          setContract(newContract);
        } else {
          console.error('Ethereum provider not found');
        }
      } catch (error) {
        console.error('Error initializing ethers:', error.message || error);
      }
    };

    initEthers();
  }, []);

  const redeemGiftCard = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate form inputs
      if (!cardId || !redeemCode || !pin) {
        throw new Error('Please enter valid card ID, redeem code, and PIN.');
      }

      // Call the redeemMind function on the contract
      const tx = await contract.redeemMind(cardId, redeemCode, pin);
      await tx.wait();

      console.log('Gift Card redeemed successfully!');
    } catch (error) {
      console.error('Error redeeming gift card:', error.message || error);
      setError(
        error.message || 'An error occurred while redeeming the gift card.'
      );
    } finally {
      setLoading(false);
    }
  };

  const checkGiftCardBalance = async () => {
    try {
      setError('');
      setBalance(null);

      // Validate card ID
      if (!cardId) {
        throw new Error('Please enter a valid card ID.');
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
        <Heading mb="4">Redeem Gift Card</Heading>
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
        <FormControl mb="4">
          <FormLabel>Redeem Code:</FormLabel>
          <Input
            type="text"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            placeholder="Enter redeem code"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>PIN:</FormLabel>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={redeemGiftCard} isLoading={loading} loadingText="Redeeming...">
          Redeem Gift Card
        </Button>

        <FormControl mt="4">
          <FormLabel>Check Gift Card Balance:</FormLabel>
          <Button colorScheme="teal" onClick={checkGiftCardBalance}>
            Check Balance
          </Button>
        </FormControl>

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

export default GiftCardRedeemComponent;



// 0x55544b534a504d52