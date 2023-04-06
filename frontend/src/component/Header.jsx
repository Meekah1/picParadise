// import  from 'react'
import React from 'react';

import {
  Box,
  Flex,
  HStack,
  Link,
  // NavLink,
  // Navigation,
  IconButton,
  // Button,
  // Menu,
  Image,
  // Text,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { Link } from 'react-router-dom';

const Links = [
  { title: 'About Us', url: '/aboutUs' },
  { title: 'Privacy', url: '/privacy' },
  { title: 'Contact', url: '/' },
];

const NavLink = ({ url, children }) => (
  <Link
    px={2}
    py={1}
    as={'b'}
    rounded={'md'}
    _hover={{
      cusor: 'pointer',
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={url}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('blue.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <a href='/'>
              <Image
                src='picParadise.jpg'
                alt='logo'
                height={50}
                width={50}
                borderRadius='24px 0 30px 0'
              />
            </a>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.title}  >
                {link.title}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <ConnectButton />
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink   key={link.title} url={link.url}>
                {link.title}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
