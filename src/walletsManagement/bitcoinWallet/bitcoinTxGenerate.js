require('../../../models/Wallets_datas');
var MyWallet = require('blockchain.info/MyWallet');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');



function sendWallet(userName,password,walletId,address,amount){

var options = { apiCode: 'myAPICode', apiHost: 'http://localhost:3000' }
var wallet = new MyWallet(walletId, password, options)
var options1 = {from:0};
wallet.send(address, amount, options1).then(function (response) { 
console.log(response);
});

// Sends bitcoin from the wallet to a given address. Responds with a Payment Response Object.

// Parameters:

    // address - bitcoin address to send to
    // amount - amount in satoshi to send

// Options (optional):

    // from - send from a specific Bitcoin address or account index (string|number, required when sending from an account)
    // fee - transaction fee value in satoshi (number, defaults to 0.0001btc)
    // feePerByte - transaction fee in satoshi per byte (number, recommended)

// Payment Response Object Properties:

    // to - payment destinations ([string|number])
    // amounts - payment amounts ([number])
    // from - from account / address (string|number)
    // fee - final fee paid in satoshi (number)
    // message - message confirming the transaction (string)
    // tx_hash - the hash of the transaction (string)
    // notice - notice, not always returned (string)


}

sendWallet(userName,password,walletId,address, amount);