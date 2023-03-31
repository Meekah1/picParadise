import React from 'react';
import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import Header from '../component/Header';

const Hero = () => {
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
            base: 300,
            md: 500, 
            xl: 800,
          }}
          justifyContent='center'
          alignItems='center'
          gap={4}
        >
          <Box>
            <a href='/viewPhoto'>
              <Button
                width={{
                  base: 160, 
                  md: 240, 
                  xl: 400, 
                }}
                bgGradient='linear(to-r, green.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, green.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={handleViewPhotos}
              >
                View Photos
              </Button>
            </a>
          </Box>
          <Spacer />
          <Box>
            <a href='/addPhoto'>
              <Button
                width={{
                  base: 160, 
                  md: 240, 
                  xl: 400, 
                }}
                bgGradient='linear(to-r,  red.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r,  red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={handleAddPhoto}
                
              >
                Add Photos
              </Button>
            </a>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
