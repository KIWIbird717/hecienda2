import { ethers } from 'ethers';
import TokenSaleContractArtifacts from '../artifacts/contracts/exchange.sol/exchange.json';


async function buyTokens(tokenSaleAddress, amount) {
    // const signer = provider.getSigner();
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    

      const contract = new ethers.Contract(
        tokenSaleAddress,
        TokenSaleContractArtifacts.abi,
        signer
      );
    
      try {
        const buyTokens = await contract.buyTokens(amount)
        await buyTokens.wait();
      } catch(err) {
        throw err
      }
    }
  }
  

async function getMax(provider, tokenSaleAddress) {

    const TokenContract = new ethers.Contract(
        tokenSaleAddress,
        TokenSaleContractArtifacts.abi,
        provider
      );
  
    const max = await TokenContract.getMax();
    return max
  }

  async function getMin(provider, tokenSaleAddress) {

    const TokenContract = new ethers.Contract(
        tokenSaleAddress,
        TokenSaleContractArtifacts.abi,
        provider
      );
  
    const min = await TokenContract.getMin();
    return min
  }