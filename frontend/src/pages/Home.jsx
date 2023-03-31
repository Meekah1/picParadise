import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';

export default function Home() {
  return (
    <Flex direction={'column'}>
      <Header />
      <HeroSection />
    </Flex>
  );
}
