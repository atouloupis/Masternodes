require('../../../models/Wallets_datas');
var MyWallet = require('blockchain.info/MyWallet');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function balanceWallet(userName,password,walletId){

	jsonfile.readFile(keyfile, function (err, obj) {
		var apicode=obj.blockchainWallet.apikey;
		var apiHost = 'http://localhost:3001';
		var options = { apiCode: apicode, apiHost: apiHost };
		var wallet = new MyWallet(walletId, password, options)
		wallet.getBalance().then(function (response) { 
			console.log(response); 
		})
	//retourner balance et pubkey.

	});
}

 balanceWallet("Andreas",1234,'b4feb707-545c-41c7-991d-d07028063b92');