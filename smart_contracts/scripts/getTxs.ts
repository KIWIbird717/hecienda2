import { ethers } from "hardhat";
// require('dotenv').config();

import arts from '../artifacts/contracts/Stablecoin.sol/Hacienda.json';
async function getTokenFromTxs(tokenAddress : string, userAddress : string) {

const contractAddress = "0x7BDaf7a6E6eAa846b69Da14ED2C7CA7457069df3"

  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    contractAddress,
    arts.abi,
    signer
  );

  const utils = ethers.utils

  let filter = {
    address: contractAddress,
    topics: [
        utils.id("Transfer(address,address,uint)"),
        utils.hexZeroPad(utils . getAddress(userAddress), 32)
    ]
};

let events = await contract.queryFilter(filter)

// let vaultAdresses = []

// for (let i = 0; i < events.length; i++) {
//     vaultAdresses.push(events[i]);
    
// }

// console.log(events[0].args?.vault)
console.log(events)
return events

}

getTokenFromTxs("0x7BDaf7a6E6eAa846b69Da14ED2C7CA7457069df3", "0x53b824334c4462aad8cf7b31fa2c873f5f438f89")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });