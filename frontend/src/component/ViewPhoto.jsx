import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/picParadise.sol/picParadise.json';
import Header from './Header';

const RecordCard = ({
  title,
  description,
  price,
  imageSrc,
  id,
  owner,
  contract,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState('');
  // const [currentOwner, setCurrentOwner] = useState(maskedNumber);


  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'File Uploaded.',
      description: 'Photo Purchased successfully',
      position: 'top',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

  const handleImageClick = (src) => {
    setIsFullscreen(true);
    setFullscreenImageSrc(src);
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setFullscreenImageSrc('');
  };


  const handleBuyPhoto = async () => {
    console.log('id before parsing:', id);
    const idAsInt = parseInt(id);
    console.log('id after parsing:', idAsInt);
    try {
      const result = await contract.buyPhoto(parseInt(id), {
        gasLimit: 100000,
      });
   console.log('result', result);
      // setCurrentOwner(address);

      console.log('result', result);

      successToast();
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while buying the photo.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const number = owner;

  // Extract the first 6 and last 6 characters of the number
  const firstSix = number.slice(0, 6);
  const lastSix = number.slice(-6);

  // Replace the remaining characters with "..."
  const middleDots = '…';

  // Combine the parts to form the masked number
  const maskedNumber = `${firstSix}${middleDots}${lastSix}`;

  return (
    <>
      <Card w={'400px'} justifyItems='center' alignItems='center'>
        <CardBody w={'400px'} justifyItems='center' alignItems='center'>
          <Image
            w={'200px'}
            style={{ cursor: 'pointer' }}
            src={imageSrc}
            alt={title}
            borderRadius='lg'
            onClick={() => handleImageClick(imageSrc)}
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Title: {title}</Heading>
            <Text size='md'>Description: {description}</Text>
            <Text size='md'>Owner: {maskedNumber}</Text>
            {/* <Text size='md'>Price: {price / 1000000000000000000}</Text> */}
          </Stack>
          {/* <Button onClick={handleBuyPhoto}>Buy</Button> */}
        </CardBody>
      </Card>
      {isFullscreen && (
        <Box
          position='fixed'
          zIndex={9999}
          top={0}
          left={0}
          w={'400px'}
          backgroundColor='#fff'
          onClick={handleFullscreenClick}
        >
          <Image src={fullscreenImageSrc} maxW='100%' maxH='100%' m='auto' />
        </Box>
      )}
    </>
  );
};

const RecordGrid = ({ data, contract }) => {
  return (
    <>
      <Header />
      <Box w={'400px'} p='30px' bg='gray.200' mt={10}>
        <Grid
          w={'400px'}
          templateColumns='repeat(3, 1fr)'
          gap={3}
          justifyItems='center'
          alignItems='center'
        >
          {data?.map((dat, index) => {
            console.log('daaaataGrid', dat[0] * 1);

            return (
              <GridItem w={'400px'} key={dat[5]}>
                <RecordCard
                  id={data[0]}
                  title={dat[1]}
                  price={dat[4]}
                  description={dat[2]}
                  imageSrc={dat[5]}
                  owner={dat[3]}
                  contract={contract}
                />
              </GridItem>
            );
          })}
        </Grid>
        <Flex justifyContent='center' alignItems='center'>
          <a href='/hero'>
            <Button
              alignContent='center'
              alignItems='center'
              bgGradient='linear(to-r, red.400,pink.400)'
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
            >
              Go Back
            </Button>
          </a>
        </Flex>
      </Box>
    </>
  );
};

const ViewPhoto = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const CONTRACT_ADDRESS = '0x172c4309A7fa6D1AA9ea87Af45c76A2984e8f587';

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider, // use signer if available, else use provider
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await contract.getAllPhotos();
        setData(result);
        console.log('result', result);
      } catch (error) {
        console.error(error);
        // Show error toast
        toast({
          title: 'Error',
          description: 'An error occurred while getting the file.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      successToast();
    }
  }, [isLoading]);

  console.log('datatatatatatatat', data[0]);
  return (
    <>
      {isLoading ? (
        <Box w='80%' mx='auto' p='30px' bg='gray.200' mt={10}>
          <Heading color={'orange.400'} size='md'>
            Loading...
          </Heading>
        </Box>
      ) : data.length === 0 ? (
        <Box w='80%' mx='auto' p='30px' bg='gray.200' mt={10}>
          <Heading color={'orange.400'} size='md'>
            No records found
          </Heading>
          <a href='/hero'>
            <Button
              alignContent='center'
              alignItems='center'
              bgGradient='linear(to-r, red.400,pink.400)'
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
            >
              Go Back
            </Button>
          </a>
        </Box>
      ) : (
        <RecordGrid data={data} contract={contract} />
      )}
    </>
  );
};

export default ViewPhoto;
