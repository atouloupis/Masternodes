require('../../../models/Wallets_datas');
var MyWallet = require('blockchain.info/MyWallet');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function createWallet(userName,password){

	jsonfile.readFile(keyfile, function (err, obj) {
		var apicode=obj.blockchainWallet.apikey;
		var apiHost = 'http://localhost:3001';
		var options = { apiCode: apicode, apiHost: apiHost };
		var HDoptions = {
		label:"first wallet create",
		hd:true,
		apiHost:apiHost
		};

		//working - Create a wallet
		MyWallet.create(password, apicode, HDoptions).then(function (wallet) {

		//var wallet = new MyWallet(response.MyWallet.guid, password, options)
		// working - create new HD account 
			wallet.createAccount({label:userName}).then(function (account) {

				var BTCwallet = new Wallets_datas(
				{
					user:userName,
					crypto:[{
						name: "btc",
						pubkeys:account.xpub,
						privkeysid: account.xpriv,
						balance: 0,
						walletid:wallet.MyWallet.guid
					}]
				});
					BTCwallet.save(function (err) {
						if (err) return handleError(err);
						// saved!
					});
				});
		});
	});
}

createWallet("Andreas",1234);