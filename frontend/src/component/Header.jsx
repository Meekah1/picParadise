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


// const Links = [
//   { label: 'About Us', href: '/about-us' },
//   { label: 'Privacy', href: '/privacy' },
//   { label: 'Contact', href: '/contact' },
// ];

// const NavLink = ({ href, children }) => (
//   <Link
//     px={2}
//     py={1}
//     as={'b'}
//     rounded={'md'}
//     _hover={{
//       cursor: 'pointer',
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={href}
//   >
//     {children}
//   </Link>
// );

// const Navigation = () => (
//   <Stack direction='row' spacing={4}>
//     {Links.map(({ label, href }) => (
//       <NavLink key={label} href={href}>
//         {label}
//       </NavLink>
//     ))}
//   </Stack>
// );

const Links = ['About Us', 'Privacy', 'Contact'];
// const Links = [
//   { label: 'About Us', href: '/aboutUs' },
//   { label: 'Privacy', href: '/privacy' },
//   { label: 'Contact', href: '/' },
// ];

const NavLink = ({ href,  children }) => (
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
    href={href}
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
            <Link href='/'>
            <Image
              src='picParadise.jpg'
              alt='logo'
              height={50}
              width={50}
              borderRadius='24px 0 30px 0'
            />
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
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
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
