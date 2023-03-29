import React from 'react';
import { Box, Text, Link, Button, Flex, Spacer } from '@chakra-ui/react';
import Header from '../component/Header';

const GeneralPage = () => {
  const handleViewPhotos = () => {
    // Render view photos functionality
    console.log('View Photos clicked!');
  };

  const handleAddPhoto = () => {
    // Render add photo functionality
    console.log('Add Photo clicked!');
  };

  return (
    <>
      <Header />
      <Box
        bgImage="url('crypto.jpg')"
        bgSize='cover'
        bgPosition='center'
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        position='relative'
      >
        <Box
          position='absolute'
          lineHeight='1.0'
          top='40px'
          w={{ base: 300, sm: 500, md: 800 }}
          // h='100px'
        >
          <Text
            // as='samp'
            color='black'
            fontWeight={700}
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
          >
            Experience a world of endless Photos with the ability to Upload,
            View, and Buy Using Crypto!
          </Text>
        </Box>
        <Flex>
            <Button onClick={handleViewPhotos} m='2'>
              View Photos
            </Button>
            <Button onClick={handleAddPhoto} m='2'>
              Add Photos
            </Button>
        </Flex>
        <Box left='20px' textAlign='center' position='absolute' bottom='30px'>
          <Link href='/Home'>
            <Button m='2'>Go back to home page</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default GeneralPage;
