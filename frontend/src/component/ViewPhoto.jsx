import React, { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Link,
  ModalCloseButton,
} from '@chakra-ui/react';
// import { Link } from "react-router-dom";

const IMAGES = [
  {
    id: 1,
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder 1',
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder 2',
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder 3',
  },
];

const ViewPhoto = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box p='6'>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {IMAGES.map((image) => (
          <Box key={image.id}>
            <Image src={image.src} alt={image.alt} />
            <Button mt='2' onClick={() => handleImageClick(image)}>
              View
            </Button>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={selectedImage !== null} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedImage?.alt}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage?.src} alt={selectedImage?.alt} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box mt='4' textAlign='center'>
        <Link to='/'>Go back to home page</Link>
      </Box>
    </Box>
  );
};

export default ViewPhoto;
