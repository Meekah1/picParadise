import React from 'react';
import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';

const Hero = () => {


  return (
    <>
      <Header />
      <Box
        bgImage={`url('crypto.jpg')`}
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
            Experience the world of endless Photos with the ability to Upload,
            View, and Store your Pictures or Art in a Decentralized way!
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
            <Link to='/viewPhoto'>
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
            >
              View Photos
            </Button>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Link to='/addPhoto'>
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

export default Hero;
