import React from 'react';
import { Flex } from '@chakra-ui/react';

// import HeroSection from '../components/';
// import Header from './../components/Header';
import Header from '../component/Header';
import HeroSection from './../component/HeroSection';

export default function Home() {
  return (
    <Flex direction={'column'}>
      <Header />
      <HeroSection />
    </Flex>
  );
}
