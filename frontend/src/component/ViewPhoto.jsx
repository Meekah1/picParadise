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
  Link,
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

  const handleImageClick = (src) => {
    setIsFullscreen(true);
    setFullscreenImageSrc(src);
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setFullscreenImageSrc('');
  };

  // console.log('dddddddddddd', typeof id);

  const handleBuyPhoto = async () => {
    console.log('id before parsing:', id);
    const idAsInt = parseInt(id);
    console.log('id after parsing:', idAsInt);
    try {
      const result = await contract.buyPhoto(parseInt(id), {
        gasLimit: 100000,
      });
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

  return (
    <>
      <Card maxW='sm'>
        <CardBody>
          <Image
            style={{ cursor: 'pointer' }}
            src={imageSrc}
            alt={title}
            borderRadius='lg'
            onClick={() => handleImageClick(imageSrc)}
          />
          <Stack mt='6' spacing='3'>
            <Heading size='2xl'>Title: {title}</Heading>
            <Text size='md'>Description: {description}</Text>
            <Text size='md'>Owner: {owner}</Text>
            <Text size='md'>Price: {price / 1000000000000000000}</Text>
          </Stack>
          <Button onClick={handleBuyPhoto}>Buy</Button>
        </CardBody>
      </Card>
      {isFullscreen && (
        <Box
          position='fixed'
          zIndex={9999}
          top={0}
          left={0}
          width='80%'
          height='80%'
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
      <Box w='80%' mx='auto' p='30px' bg='gray.200' mt={10}>
        <Grid templateColumns='repeat(3, 1fr)' gap={3}>
          {data?.map((dat, index) => {
            console.log('daaaataGrid', dat[0] * 1);

            return (
              <GridItem key={data[0] * 2}>
                <RecordCard
                  key={data[0] * 2}
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
        <Flex
        justifyContent='center'
        alignItems='center'>
          <Link href='/generalPage'>
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
          </Link>
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

  const CONTRACT_ADDRESS = '0x99c1Ab924a5e33C72F15580b3Ce7d7b47D7D9b08';

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
        </Box>
      ) : (
        <RecordGrid data={data} contract={contract} />
      )}
    </>
  );
};

export default ViewPhoto;
