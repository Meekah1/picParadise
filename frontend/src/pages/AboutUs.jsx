import { Flex, Box, Image, Heading, Text } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Flex flexDirection='column' alignItems='center' mt='4rem'>
      <Box mb='2rem'>
        <Image src='/picparadise-logo.svg' alt='PicParadise Logo' />
      </Box>
      <Box textAlign='center'>
        <Heading as='h1' size='xl' mb='1rem'>
          About Us
        </Heading>
        <Text fontSize='xl'>
          PicParadise is a decentralized photo app that allows users to upload,
          view, and buy pictures using blockchain technology. Our mission is to
          create a fair and transparent marketplace for photographers and buyers
          alike.
          
          We believe that blockchain technology has the potential to
          revolutionize the photography industry by eliminating intermediaries,
          reducing costs, and increasing transparency. By using smart contracts
          to manage the buying and selling of pictures, we aim to create a
          platform that benefits both photographers and buyers.
          
          Our team consists of experienced developers, designers, and entrepreneurs who
          are passionate about blockchain technology and its potential to change
          the world. We are committed to creating an app that is secure,
          user-friendly, and accessible to everyone. Thank you for using
          PicParadise!
        </Text>
      </Box>
    </Flex>
  );
};

export default AboutUs;
