import { ethers } from 'ethers';
import LinearVestingVaultFactoryArtifacts from '../artifacts/contracts/vesting/LinearVestingVaultFactory.sol/LinearVestingVaultFactory.json';
import { arts } from "../artifacts/contracts/Stablecoin.sol/Hacienda.json";

let PROVIDER = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/bsc");
export async function getVaults(provider, contractAddress, userAddress, tokenAddress) {
    const LinearVestingVaultFactoryContract = new ethers.Contract(
        contractAddress,
        LinearVestingVaultFactoryArtifacts.abi,
        // provider
        PROVIDER
      );

    const utils = ethers.utils

    let filter = {
        address: contractAddress,
        topics: [
            utils.id("VaultCreated(address,address,address)"),
            utils.hexZeroPad(utils . getAddress(tokenAddress), 32),
            utils.hexZeroPad(utils . getAddress(userAddress), 32)
    ]};

    const startBlock = 25635927;
    const endBlock = 26003313;
    let allEvents = []

    try {
      for(let i = startBlock; i < endBlock; i += 3000) {
        const _startBlock = i;
        const _endBlock = Math.min(endBlock, i + 2999);
        const events = await LinearVestingVaultFactoryContract.queryFilter(filter, _startBlock, _endBlock);
        // console.log(i)
        allEvents = [...allEvents, ...events]
      }
    } catch(err) {
      throw err
    }

    // console.log(allEvents)

    // console.log(25635927 - 26003313)

    let events = allEvents

    let vaultAdresses = []

    for (let i = 0; i < events.length; i++) {
        vaultAdresses.push(events[i].args?.vault);
        // console.log(i)
    }

    // console.log(vaultAdresses)
    return vaultAdresses
  }

  // async function getTokenTxsFrom(provider, tokenAddress, userAddress) {
  //   const TokenContract = new ethers.Contract(
  //       tokenAddress,
  //       arts.abi,
  //       provider
  //     );
  //     const utils = ethers.utils

  //     let filter = {
  //       address: tokenAddress,
  //       topics: [
  //           utils.id("Transfer(address,address,uint)"),
  //           utils.hexZeroPad(utils . getAddress(userAddress), 32)
  //       ]
  //   };
    
  //   let events = await TokenContract.queryFilter(filter)
    
  //   console.log(events)
  //   return events
  // }

  