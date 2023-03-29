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
  Stack,
  useToast,
} from '@chakra-ui/react';

const RecordCard = ({ title, description, price, imageSrc }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState('');

  const handleImageClick = (src) => {
    setIsFullscreen(true);
    setFullscreenImageSrc(src);
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setFullscreenImageSrc('');
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
            <Heading size='md'>{title}</Heading>
            <Text size='md'>{description}</Text>
            <Text size='md'>{price}</Text>
          </Stack>
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

const RecordGrid = ({ data }) => {
  console.log('data', data);
  return (
    <Box w='80%' mx='auto' p='30px' bg='gray.200' mt={10}>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {data?.map((dat, index) => {
          console.log('daaaataatatata', dat[1]);

          return (
            <GridItem key={Math.floor(Math.random() * 1000)}>
              <RecordCard
                key={`record-${Math.floor(Math.random() * 1000)}`}
                title={dat[0]}
                imageSrc={dat[1]}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

const ViewPhoto = ({ contract }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'Records fetched.',
      description: 'Records are gotten from the blockchain',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
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

  console.log('data', data);
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
        <RecordGrid data={data} />
      )}
    </>
  );
};

export default ViewPhoto;
