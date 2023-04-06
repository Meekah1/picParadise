import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Box mt='4rem'>
      <Heading as='h1' size='xl' textAlign='center' mb='2rem'>
        Privacy Policy
      </Heading>
      <Text mb='1rem'>
        At PicParadise, we are committed to protecting your privacy and ensuring
        that your personal information is secure. This privacy policy explains
        how we collect, use, and protect your information when you use our app.
      </Text>
      <Text mb='1rem'>
        We collect information that you provide to us when you use our app, such
        as your name, email address, and payment information. We also collect
        information about your activity on the app, such as the pictures you
        view and purchase.
      </Text>
      <Text mb='1rem'>
        We use your information to provide and improve our app, to communicate
        with you about your account and transactions, and to personalize your
        experience on the app. We may also use your information for research and
        analytics purposes.
      </Text>
      <Text mb='1rem'>
        We do not sell your personal information to third parties, and we only
        share your information with third parties when it is necessary to
        provide our services to you, such as with payment processors and
        blockchain networks.
      </Text>
      <Text mb='1rem'>
        We take the security of your information seriously and use
        industry-standard measures to protect your data from unauthorized
        access, disclosure, or destruction. We store your information on secure
        servers and use encryption to protect your payment information.
      </Text>
      <Text mb='1rem'>
        You have the right to access, update, and delete your personal
        information at any time. You also have the right to object to the
        processing of your information and to withdraw your consent for us to
        use your information.
      </Text>
      <Text>
        If you have any questions or concerns about our privacy policy, please
        email us at{' '}
        <Link href='mailto:privacy@picparadise.com'>
          privacy@picparadise.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
