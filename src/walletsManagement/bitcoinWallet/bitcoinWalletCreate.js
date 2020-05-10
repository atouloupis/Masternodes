require('../../../models/Wallets_datas');
var MyWallet = require('blockchain.info/MyWallet');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function createWallet(userName,password,callback){
        var exist=undefined;
	Wallets_datas.find({user:userName}).then((wallets,err) => {
		if (err) return handleError(err);
        if (wallets!=""){
            exist= wallets.crypto.find(exist => exist.name == "btc");
        }
		if (exist==undefined){
			jsonfile.readFile(keyfile, function (err, obj) {
				if (err) return handleError(err);
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
				// working - create new HD account 
                console.log(wallet);
					wallet.createAccount({label:userName}).then(function (account) {
                        console.log(account);
                        
                        wallet.getAccountReceiveAddress(0).then(function (address) {

                        console.log(address);
						var BTCwallet = new Wallets_datas(
						{
							user:userName,
							crypto:[{
								name: "btc",
								pubkeys:account.xpub,
								privkeysid: account.xpriv,
								balance: 0,
								walletid:wallet.guid,
                                receiveaddress:address.address
							}]
						});
							BTCwallet.save(function (err) {
								if (err) return handleError(err);
								// saved!
                                callback(BTCwallet);
							});
						});
                    });
				});
			});
		}
	});
}

module.exports.createWallet = createWallet;
