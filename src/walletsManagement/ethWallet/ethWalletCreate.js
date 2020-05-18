require('../../../models/Wallets_datas');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');
const Web3 = require("web3")

function createWallet(userName,password,callback){
    var exist=undefined;
	Wallets_datas.find({user:userName}).then((wallets,err) => {
		if (err) return handleError(err);
        if (wallets!=""){
            wallets.forEach( wallet => {
            exist= wallet.crypto.find(exist => exist.name == "eth");
            });
        }
		if (exist==undefined){
			jsonfile.readFile(keyfile, function (err, obj) {
				if (err) return handleError(err);
				var projectid=obj.infura.projectid;
				var projectsecret=obj.infura.projectsecret;
                const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/"+projectid))
                var account=web3.eth.accounts.create();
						var BTCwallet = new Wallets_datas(
						{
							user:userName,
							crypto:[{
								name: "eth",
								pubkeys:account.address,
								privkeysid: account.privateKey,
								balance: 0,
                                receiveaddress:account.address
							}]
						});
							BTCwallet.save(function (err) {
								if (err) return handleError(err);
                                callback(BTCwallet);
							});
//web3.eth.accounts.encrypt(privateKey, password); (return the keystroeJsonV3)
//web3.eth.accounts.decrypt(keystoreJsonV3, password);
                
			});
		}
	});
}

module.exports.createWallet = createWallet;
