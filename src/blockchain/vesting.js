import { ethers } from 'ethers';
import arts from '../artifacts/contracts/vesting/LinearVestingVault.sol/LinearVestingVault.json';

//tx
const requestAccount = async () => {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function vesitngVaultClaim(contractAddress) {
    // const signer = provider.getSigner();
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    

      const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        signer
      );
  
      const claim = await vesitngVault.claim(); // address, id
      await claim.wait();
    }
  }
  
//read
async function getAmountClaimed(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const amountClaimed = await vesitngVault.amountClaimed();
    return amountClaimed
  }

async function getBeneficiary(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const beneficiary = await vesitngVault.beneficiary();
    
    return beneficiary
  }

  async function getToken(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const token = await vesitngVault.token();
    
    return token
  }

  async function getTotalAmount(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const totalAmount = await vesitngVault.totalAmount();
    
    return totalAmount
  }

  async function getUnvested(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const unvested = await vesitngVault.unvested();
    
    return unvested
  }

  async function getVested(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const vested = await vesitngVault.vested();
    
    return vested
  }

  async function getVestEndTimestamp(provider, contractAddress) {

    const vesitngVault = new ethers.Contract(
        contractAddress,
        arts.abi,
        provider
      );
  
    const vestEndTimestamp = await vesitngVault.vestEndTimestamp();
    
    return vestEndTimestamp
  }

  async function getVestStartTimestamp(provider, contractAddress) {


    const contract = new ethers.Contract(
      contractAddress,
      arts.abi,
      provider
    );
  
    const vestStartTimestamp = await contract.vestStartTimestamp();
  console.log(vestStartTimestamp)
  }

  export {
    vesitngVaultClaim,
    getAmountClaimed,
    getBeneficiary,
    getToken,
    getTotalAmount,
    getUnvested,
    getVested,
    getVestEndTimestamp,
    getVestStartTimestamp
  }