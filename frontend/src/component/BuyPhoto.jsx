import React, { useState, useEffect, useMemo } from 'react';
import { useWAGMI } from '@wagmi/react';
import picParadise from './contracts/picParadise.json';

const networkName = 'mainnet'; // or "mainnet", "ropsten", etc.
const contractAddress = '0xfef27a09fa1b13662fd353b9f92738c06441d7af'; // replace with your contract's address
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'PhotoAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'PhotoPurchased',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_ipfsHash',
        type: 'bytes32',
      },
    ],
    name: 'addPhoto',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'balances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'buyPhoto',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'photos',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'ipfsHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

function BuyPhoto() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // const { web3 } = useWAGMI(networkName);
  // const contractInstance = new web3.eth.Contract(
  //   picParadiseContract.abi,
  //   contractAddress,
  // );
  const { web3 } = useWAGMI(networkName);
  const contractInstance = useMemo(
    () => new web3.eth.Contract(picParadise.contractABI, contractAddress),
    [web3, contractAddress]
  );

  const handleAddPhoto = async () => {
    const accounts = await web3.eth.getAccounts();

    // Call the contract's addPhoto function
    await contractInstance.methods
      .addPhoto(title, description, price, 'ipfsHash')
      .send({
        from: accounts[0],
      });
  };

  const handleBuyPhoto = async () => {
    const accounts = await web3.eth.getAccounts();

    // Call the contract's buyPhoto function
    await contractInstance.methods.buyPhoto(id).send({
      from: accounts[0],
      value: price,
    });
  };

  useEffect(() => {
    const getPhotoData = async () => {
      const photo = await contractInstance.methods.photos(id).call();
      setId(photo.id);
      setTitle(photo.title);
      setDescription(photo.description);
      setPrice(photo.price);
    };
    getPhotoData();
  }, [id, contractInstance]);

  return (
    <div>
      <h2>Add Photo</h2>
      <label>
        Title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button onClick={handleAddPhoto}>Add Photo</button>

      <hr />

      <h2>Buy Photo</h2>
      <label>
        Photo ID:
        <input
          type='number'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </label>
      <p>Title: {title}</p>
      <p>Price: {price}</p>
      <button onClick={handleBuyPhoto}>Buy Photo</button>
    </div>
  );
}

export default BuyPhoto;
