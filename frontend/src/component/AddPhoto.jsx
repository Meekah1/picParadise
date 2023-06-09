import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Input,
  useToast,
  Flex,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/picParadise.sol/picParadise.json';
// import { ethers } from 'ethers';
import Header from './Header';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  // const [imageOwner, setImageOwner] = useState('');

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
      duration: 2000,
      isClosable: true,
    });

  const CONTRACT_ADDRESS = '0x7f5111C12bb16fa7C46D795eAc361DF10a3Bc84A';

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
      const created = await client.add(image);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      // const formattedPrice = ethers.utils.parseEther(price.toString());
      console.log('hdhhgghvygvdyd', description, title);

      await contract.addPhoto(title, description, metadataURI);
      successToast();

      setImage(null);
      setTitle('');
      // setPrice();
      setDescription();
      // setImageOwner();
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Box
        w={{ sm: '240px', md: '360px', lg: '500px' }}
        mx={'auto'}
        p={'20px'}
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
          <Flex gap={4}>
            <Flex direction='column'>
              <FormLabel>Description</FormLabel>
              <Textarea
                w={{ base: '160px', md: '300px', lg: '400px' }}
                border='1px solid black'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter description'
              />
            </Flex>
            {/* <Flex direction='column'>
              <FormLabel>Price</FormLabel>
              <Input
                w={{ base: '100px', md: '160px', lg: '200px' }}
                // h='40px'
                border='1px solid black'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Enter price'
              />
            </Flex> */}
          </Flex>
        </Stack>
        <Flex alignItems={'center'} justifyContent={'center'} gap={4}>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={{ base: 60, md: 100, xl: 200 }}
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
          <a href='/hero'>
            <Button
              mt={8}
              w={{ base: 60, md: 100, xl: 200 }}
              bgGradient='linear(to-r, red.400,pink.400)'
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
            >
              Cancel
            </Button>
          </a>
        </Flex>
      </Box>
    </>
  );
};

export default AddPhoto;
