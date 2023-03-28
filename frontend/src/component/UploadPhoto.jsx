import React, { useState } from 'react';
import { Box, Stack, Button, Input, useToast } from '@chakra-ui/react';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

const projectId = '2NXvWJI2Y9WXPjVqZbDl9KgZrz2';
const projectSecret = 'ff51e38c9ebfcde848d4f463c263dda7';
const auth =
  'Basic ' + Buffer(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const UploadPhoto = ({ contract }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'File Uploaded.',
      description: 'File has been uploaded successfully',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const handleSubmit = async () => {
    try {
      const created = await client.add(file);
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`;
      await contract.addPatientRecord(fileName, metadataURI);
      successToast();

      setFile(null);
      setFileName('');
    } catch (error) {
      console.error(error);
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w={'50%'} mx={'auto'} p={'30px'} bg={'gray.200'} as={'form'} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder='Name of file'
          value={fileName}
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Input type='file' color={'gray.800'} onChange={handleFileSelect} />
        <img
          src={
            file ? URL.createObjectURL(new Blob([file])) : undefined // Use undefined instead of null
          }
          alt='doc.'
          style={{ height: '100px', width: '100px' }}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={handleSubmit}
        bgGradient='linear(to-r, red.400,pink.400)'
        color={'white'}
        _hover={{
          bgGradient: 'linear(to-r, red.400,pink.400)',
          boxShadow: 'xl',
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UploadPhoto;
