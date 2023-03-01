import { ethers } from 'ethers';
import TokenContractArtifacts from '../artifacts/contracts/Hacienda.sol/Hacienda.json';

export async function getBalanceOf(provider, contractAddress, userAddress) {

    const TokenContract = new ethers.Contract(
        contractAddress,
        TokenContractArtifacts.abi,
        provider
      );
    try{
      const balance = await TokenContract.balanceOf(userAddress);
      return balance
    } catch(err) {
      throw err
    }
  }