import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/picParadise.sol/picParadise.json';


const projectId = '2Nf04C3kIxNtYDBrJBWTpRhZbjG';
const projectSecret = 'ba10a0b74e50e73ebe2c50f15a10d21a';
const auth =
  'Basic ' + Buffer(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const AddPhoto = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'File Uploaded.',
      description: 'File has been uploaded successfully',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

const CONTRACT_ADDRESS = '0xfef27a09fa1b13662fd353b9f92738c06441d7af';

const provider = useProvider();
const { data: signer } = useSigner({
  chainId: optimism.id,
});

const contract = useContract({
  address: CONTRACT_ADDRESS,
  abi: ensRegistryABI.abi,
  signerOrProvider: signer || provider, // use signer if available, else use provider
});

  const handleSubmit = async () => {
    try {
      const created = await client.add(file);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      await contract.addPhoto(fileName, metadataURI);
      successToast();

      setFile(null);
      setFileName('');
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w={'50%'} mx={'auto'} p={'30px'} bg={'gray.200'} as={'form'} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder='Name of file'
          value={fileName}
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Input type='file' color={'gray.800'} onChange={handleFileSelect} />
        <img
          src={
            file ? URL.createObjectURL(new Blob([file])) : undefined // Use undefined instead of null
          }
          alt='doc.'
          style={{ height: '100px', width: '100px' }}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={() => setIsOpen(true)}
        bgGradient='linear(to-r, red.400,pink.400)'
        color={'white'}
        _hover={{
          bgGradient: 'linear(to-r, red.400,pink.400)',
          boxShadow: 'xl',
        }}
      >
        Upload Photo(s)
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Photo</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter title'
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter description'
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter price'
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddPhoto;
