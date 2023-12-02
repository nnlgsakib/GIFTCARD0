
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Spinner,
  ChakraProvider,
  Button, // Import Button
  Text, // Import Text
} from '@chakra-ui/react';

import { giftcard, giftcardABI } from '../const';
import WalletConnectComponent from './WalletConnectComponent';

const GiftCardComponent = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState(0);
  const [cardId, setCardId] = useState(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractAddress = giftcard;
        const abi = giftcardABI;
        const deployedContract = new ethers.Contract(contractAddress, abi, provider);

        setContract(deployedContract);
        setAccount(signer);
      } catch (error) {
        console.error('Error initializing contract:', error.message || error);
      }
    };

    init();
  }, []);

  const createGiftCard = async () => {
    try {
      setLoading(true);
      setError('');

      if (!pin || isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid PIN and amount.');
      }

      const contractWithSigner = contract.connect(account);

      const tx = await contractWithSigner.createGiftCard(
        ethers.utils.parseUnits(pin, 'wei'),
        { value: ethers.utils.parseEther(amount.toString()) }
      );
      const receipt = await tx.wait();

      const event = receipt.events.find(
        (event) => event.event === 'GiftCardCreated'
      );

      if (event) {
        const cardId = event.args[0].toNumber();
        const redeemCodeBytes32 = event.args[1];
        const redeemCode = ethers.utils
          .hexlify(redeemCodeBytes32)
          .slice(0, 18);

        setCardId(cardId);
        setRedeemCode(redeemCode);

        console.log('Gift Card created successfully!');
      } else {
        throw new Error(
          'GiftCardCreated event not found in transaction receipt.'
        );
      }
    } catch (error) {
      console.error('Error creating gift card:', error.message || error);
      setError(
        error.message || 'An error occurred while creating the gift card.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box p="4">
        <Heading mb="4">Gift Card DApp</Heading>
        <WalletConnectComponent setAccount={setAccount} />

        {contract && account && (
          <Box maxW="400px" m="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg">
            <Heading mb="4">Create Gift Card</Heading>
            {error && (
              <Alert status="error" mb="4">
                <AlertIcon />
                <AlertTitle mr={2}>{error}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
              </Alert>
            )}
            <FormControl mb="4">
              <FormLabel>PIN:</FormLabel>
              <Input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Amount (MIND):</FormLabel>
              <NumberInput value={amount} onChange={(value) => setAmount(value)} min={0}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <Button colorScheme="teal" onClick={createGiftCard} isLoading={loading} loadingText="Creating...">
              Create Gift Card
            </Button>

            {loading && (
              <Box mt="4" textAlign="center">
                <Spinner size="lg" color="teal.500" />
              </Box>
            )}

            {cardId && redeemCode && (
              <Box mt="4">
                <Heading size="md" mb="2">
                  Gift Card Details
                </Heading>
                <Text>Card ID: {cardId}</Text>
                <Text>Redeem Code: {redeemCode}</Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default GiftCardComponent;
