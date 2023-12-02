import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';

const ProfileModal = ({ isOpen, onClose, address }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Your connected wallet address:</Text>
          {address ? (
            <Text fontWeight="bold">{address}</Text>
          ) : (
            <Text color="red">Wallet address not available</Text>
          )}
        </ModalBody>
        <ModalFooter>
          {/* Add any additional buttons or actions as needed */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
