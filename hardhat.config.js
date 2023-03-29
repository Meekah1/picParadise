// require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: '0.8.18',
//   networks: {
//     polygon_mumbai: {
//       url: process.env.MUMBAI_URL || '',
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
// };

// picParadise is deployed to: 0xfef27a09fa1b13662fd353b9f92738c06441d7af;


// 'https://rpc-mumbai.matic.today';
// require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const PRIVATE_KEY =
  'c7fd7ccb51c8618e4c384b83cfa165d863acb2b94f25407d44bba186788f4419';
const MUMBAI_URL =
  'https://polygon-mumbai.g.alchemy.com/v2/tx5ZStDbgXGL8keyyyODMuDdnRxjlFf5';


module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    polygon_mumbai: {
      url: MUMBAI_URL || '',
      accounts:
        PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      },
    },
  };
  // process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
