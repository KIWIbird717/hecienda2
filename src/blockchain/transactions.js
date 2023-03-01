const { ethers } = require('ethers');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    let ress

    async function fetchData(_userAddress) {
        try {
            const response = await fetch(`https://api.covalenthq.com/v1/56/address/${_userAddress}/transactions_v2/?key=ckey_ada7912fe09e40929f8fd473a5d`)
            console.log(`https://api.covalenthq.com/v1/56/address/${_userAddress}/transactions_v2/?key=ckey_ada7912fe09e40929f8fd473a5d`)
            const data = await response.json();
            return data;
        } catch (error) {
            throw err
        }
    }



    export async function getFetchData(_userAddress ) {
      try {
        const data = await fetchData(_userAddress);
        let items = []
        items = data.data.items

        let filteredItems = items.filter(item => item.from_address == _userAddress) 
        let vaultsLogs = []

        filteredItems.forEach(item => {
          item.log_events.forEach(logEvent => {
            if (logEvent.raw_log_topics[0] == "0x897c133dfbfe1f6239e98b4ffd7e4f6c86a62350a131a7a37790419f58af02f9") {
              vaultsLogs.push(logEvent.raw_log_topics)
            }
          })  
        });
        let resp = []
        vaultsLogs.forEach(element => {
          let parsedElement = ethers.utils.hexStripZeros(element[3])
          resp.push(parsedElement)
        });
// ethers.utils.computeAddress() использовать для удаления нуликов, нуж
        return resp
      } catch (err) {
        throw err
      }
    }