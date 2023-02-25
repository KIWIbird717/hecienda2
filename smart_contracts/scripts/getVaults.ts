import { ethers } from "hardhat";
// require('dotenv').config();

import arts from '../artifacts/contracts/vesting/LinearVestingVaultFactory.sol/LinearVestingVaultFactory.json';
async function GetVaultsUSersAdresses(tokenAddress : string, userAddress : string) {

const contractAddress = "0x360663D506032507dfB85963bfD2A461C07C12B8"

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
        utils.id("VaultCreated(address,address,address)"),
        utils.hexZeroPad(utils . getAddress(tokenAddress), 32),
        utils.hexZeroPad(utils . getAddress(userAddress), 32)
    ]
};

let events = await contract.queryFilter(filter)

let vaultAdresses = []

for (let i = 0; i < events.length; i++) {
    vaultAdresses.push(events[i].args?.vault);
    
}

// console.log(events[0].args?.vault)
console.log(vaultAdresses)
return vaultAdresses

}

GetVaultsUSersAdresses("0xff84a7fbbba12d039418592768fca6ae9fe90dcb", "0x53b824334c4462aad8cf7b31fa2c873f5f438f89")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });