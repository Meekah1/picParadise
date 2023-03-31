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
          display='flex'
          top='40px'
          w={{ base: 300, sm: 500, md: 800 }}
        >
          <Text
            color='black'
            fontWeight={700}
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
          >
            Experience a world of endless Photos with the ability to Upload,
            View, and Buy Using Crypto!
          </Text>
        </Box>
        <Flex
          width={{
            base: 300, // 0-48em
            md: 500, // 48em-80em,
            xl: 800, // 80em+
          }}
          justifyContent='center'
          alignItems='center'
          gap={4}
        >
          <Box>
            <Link href='/viewPhoto'>
              <Button
                width={{
                  base: 160, // 0-48em
                  md: 240, // 48em-80em,
                  xl: 400, // 80em+
                }}
                bgGradient='linear(to-r, green.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, green.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={handleViewPhotos}
                // m='2'
              >
                View Photos
              </Button>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Link href='/addPhoto'>
              <Button
                width={{
                  base: 160, // 0-48em
                  md: 240, // 48em-80em,
                  xl: 400, // 80em+
                }}
                bgGradient='linear(to-r,  red.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r,  red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={handleAddPhoto}
                // m='2'
              >
                Add Photos
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default GeneralPage;
