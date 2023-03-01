import { ethers } from 'ethers';
import TokenSaleContractArtifacts from '../artifacts/contracts/TokenSale.sol/TokenSale.json';
import UsdtArts from '../artifacts/contracts/testUSDT.sol/testUSDT.json'
const requestAccount = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch(err) {
    throw new Error(err)
  }
}

export async function buyTokens(tokenSaleAddress, amount, USDTaddress) {
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
        const USDT = new ethers.Contract(
          USDTaddress,
          UsdtArts.abi,
          signer
        );
        const usdtApprove  = await USDT.approve(tokenSaleAddress, amount)
        await usdtApprove.wait()
      } catch(err) {
        throw err
      }

      try {
        const buyTokens = await contract.buyTokens(BigInt(Number(amount)) * 10n**18n)
        const vaultaddress = await buyTokens.wait();
        return vaultaddress
      } catch(err) {
        throw err
      }
    }
  }
  

export async function getMax(provider, tokenSaleAddress) {
    const TokenContract = new ethers.Contract(
        tokenSaleAddress,
        TokenSaleContractArtifacts.abi,
        provider
      );
  
    const max = await TokenContract.getMax();
    return max
  }

  export async function getMin(provider, tokenSaleAddress) {

    const TokenContract = new ethers.Contract(
        tokenSaleAddress,
        TokenSaleContractArtifacts.abi,
        provider
      );
  
    const min = await TokenContract.getMin();
    return min
  }