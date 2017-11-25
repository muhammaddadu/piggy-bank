const fs = require('fs');
const Web3 = require('web3');

const {run} = require('./lib/utils.js');
const prompt = require('./lib/prompt.js');

async function main() {
    // Ask user to enter password and amount of balance in Ether
    const {
        password,
        balance,
    } = await prompt();

    // Create 32 byte length hash from password
    const secretKey = Web3.utils.soliditySha3({
        type: 'string',
        value: password,
    });

    // Convert ethers to weis
    const weis = Web3.utils.toWei(balance.toString(), 'ether');

    const account = {
        secretKey,
        balance: weis,
    };

    fs.writeFileSync('./account.json', JSON.stringify(account, null, 4));
}

run(main);
