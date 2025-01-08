const Web3 = require('web3');
const { rpcUrl, contractAddress } = require('../config/config');
const abi = require('../config/abi.json');

const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
const contract = new web3.eth.Contract(abi, contractAddress);

module.exports = { web3, contract };
