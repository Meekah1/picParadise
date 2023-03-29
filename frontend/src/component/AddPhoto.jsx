import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Input,
  useToast,
  Flex,
  FormLabel,
  Spacer,
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
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
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

  const CONTRACT_ADDRESS = '0x9782464d88cd133078E24AddA4C4F265E16b898b';

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
      const created = await client.addPhoto(image);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      await contract.addPhoto(title, metadataURI);
      successToast();

      setImage(null);
      setTitle('');
      setPrice();
      setDescription();
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
    <Box
      isOpen={isOpen}
      onClick={() => setIsOpen(false)}
      w={'50%'}
      mx={'auto'}
      p={'30px'}
      bg={'gray.200'}
      as={'form'}
      mt={10}
    >
      <Stack spacing={4}>
        <FormLabel>Title</FormLabel>
        <Input
          w='160px'
          h='40px'
          border='1px solid black'
          placeholder='Name of File'
          value={title}
          bg={'gray.100'}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input type='file' color={'gray.800'} onChange={handleFileSelect} />
        <img
          src={
            image ? URL.createObjectURL(new Blob([image])) : undefined // Use undefined instead of null
          }
          alt='doc.'
          style={{ height: '200px', width: '200px' }}
        />
        <Flex gap={8}>
          <Flex direction='column'>
            <FormLabel>Description</FormLabel>
            <Textarea
              w='360px'
              border='1px solid black'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter description'
            />
          </Flex>
          <Flex direction='column'>
            <FormLabel>Price</FormLabel>
            <Input
              w='160px'
              h='40px'
              border='1px solid black'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Enter price'
            />
          </Flex>
        </Flex>
      </Stack>
      <Flex>
        <Button
          fontFamily={'heading'}
          mt={8}
          w={'44%'}
          onClick={handleSubmit}
          bgGradient='linear(to-r, green.400,pink.400)'
          color={'white'}
          _hover={{
            bgGradient: 'linear(to-r, green.400,pink.400)',
            boxShadow: 'xl',
          }}
        >
          Upload Photo(s)
        </Button>
        <Spacer />
        <Button
          mt={8}
          w={'44%'}
          onClick={() => setIsOpen(false)}
          bgGradient='linear(to-r, red.400,pink.400)'
          color={'white'}
          _hover={{
            bgGradient: 'linear(to-r, red.400,pink.400)',
            boxShadow: 'xl',
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default AddPhoto;
