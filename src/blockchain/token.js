import { ethers } from 'ethers';
import TokenContractArtifacts from '../artifacts/contracts/Stablecoin.sol/Hacienda.json';

async function getBalanceOf(provider, contractAddress, userAddress) {

    const TokenContract = new ethers.Contract(
        contractAddress,
        TokenContractArtifacts.abi,
        provider
      );
  
    const balance = await TokenContract.balanceOf(userAddress);
    return balance
  }