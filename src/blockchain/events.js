import { ethers } from 'ethers';
import LinearVestingVaultFactoryArtifacts from '../artifacts/contracts/vesting/LinearVestingVaultFactory.sol/LinearVestingVaultFactory.json';

async function getVaults(provider, contractAddress, userAddress, tokenAddress) {
    const LinearVestingVaultFactoryContract = new ethers.Contract(
        contractAddress,
        LinearVestingVaultFactoryArtifacts.abi,
        provider
      );

    const utils = ethers.utils

    let filter = {
        address: contractAddress,
        topics: [
            utils.id("VaultCreated(address,address,address)"),
            utils.hexZeroPad(utils . getAddress(tokenAddress), 32),
            utils.hexZeroPad(utils . getAddress(userAddress), 32)
    ]};

    let events = await LinearVestingVaultFactoryContract.queryFilter(filter)

    let vaultAdresses = []

    for (let i = 0; i < events.length; i++) {
        vaultAdresses.push(events[i].args?.vault);
    }

    return vaultAdresses
  }

  async function getTokenTxsFrom(provider, tokenAddress, userAddress) {
    const TokenContract = new ethers.Contract(
        tokenAddress,
        arts.abi,
        provider
      );
      const utils = ethers.utils

      let filter = {
        address: tokenAddress,
        topics: [
            utils.id("Transfer(address,address,uint)"),
            utils.hexZeroPad(utils . getAddress(userAddress), 32)
        ]
    };
    
    let events = await TokenContract.queryFilter(filter)
    
    console.log(events)
    return events
  }

  