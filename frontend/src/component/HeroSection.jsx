import React from 'react';

import {
  Box,
  Stack,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';

export default function HeroSection() {
  const { isConnected } = useAccount();
  return (
    <Box>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                fontWeight='bold'
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                Picture Paradise
              </Text>
              <br />
              <Text
                lineHeight={'1.1'}
                color={'green.600'}
                fontSize={{ base: '2xl', md: '3xl', lg: '3xl' }}
              >
                Ensure you connect your wallet using the connect wallet button
                on the Top Right Corner, before clicking the Get Started Button.
                See you on the other side!
              </Text>
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Link href='/hero' style={{ textDecoration: 'none' }}>
                <Button
                  rounded={'full'}
                  color={'white'}
                  bg={!isConnected ? 'gray.400' : 'blue.400'}
                  disabled={!isConnected}
                  cursor={!isConnected ? 'not-allowed' : 'pointer'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>
    </Box>
  );
}
