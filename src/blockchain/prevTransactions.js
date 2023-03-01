// const { ethers } = require('ethers');
import { ethers } from 'ethers';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    async function fetchData(userAddress) {
        try {
            // НЕ ЗАБЫТЬ ПОМЕНЯТЬ ССЫЛКУ В FETCH НА bsc-mainnet
            const response = await fetch(`https://api.covalenthq.com/v1/bsc-mainnet/address/${userAddress}/transactions_v3/?key=ckey_ada7912fe09e40929f8fd473a5d`)
            const data = await response.json();
            console.log(data.data)
            console.log(`https://api.covalenthq.com/v1/bsc-mainnet/address/${userAddress}/transactions_v3/?key=ckey_ada7912fe09e40929f8fd473a5d`)
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    

    export async function getLatestTransactions(from_address, USDT, HADA, linearVestingVaultFactory, tokenSale, vaultAddress) {
      try {
        const data = await fetchData(from_address);
        let items = []
        items = data.data.items
        console.log(from_address, USDT, HADA, linearVestingVaultFactory, tokenSale, vaultAddress)
        
        // let filteredItems = items.filter(item => item.from_address == from_address)
        let filteredItems = items.filter(item => item.from_address == from_address ||  item.to_address == USDT || item.to_address == HADA || item.to_address == linearVestingVaultFactory || item.to_address == tokenSale || item.to_address == vaultAddress)
        let resp = []

        filteredItems.forEach(element => {
          const respStuct = {
            value: element.value,
            block_signed_at: `${new Date(element.block_signed_at).toDateString().slice(8,10)} ${new Date(element.block_signed_at).toDateString().slice(4,7)} ${new Date(element.block_signed_at).toDateString().slice(11)}`,
            bscTx: `https://bscscan.com/tx/${element.tx_hash}`
          }
          resp.push(respStuct)
        });
        console.log(resp)
        if (resp.length == 0) {
          return [{
            value: 0,
            block_signed_at: `${new Date().toDateString().slice(8,10)} ${new Date().toDateString().slice(4,7)} ${new Date().toDateString().slice(11)}`,
            bscTx: '0xDD'
          }]
        }
        return resp
      } catch (err) {
        throw err
      }
    }
