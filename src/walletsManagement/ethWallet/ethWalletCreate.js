require('../../../models/Wallets_datas');
var MyWallet = require('blockchain.info/MyWallet');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function createWallet(userName,callback){
        var exist=undefined;
	Wallets_datas.find({user:userName}).then((wallets,err) => {
		if (err) return handleError(err);
        if (wallets!=""){
            wallets.forEach( crypto => {
            exist= crypto.find(exist => exist.name == "eth");
            });
        }
		if (exist==undefined){
			jsonfile.readFile(keyfile, function (err, obj) {
				if (err) return handleError(err);
				var projectid=obj.infura.projectid;
				var projectsecret=obj.infura.projectsecret;
                
 const Web3 = require("web3")
 
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/"+projectid))
 
web3.eth.getBalance("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c", function(err, result) {
  if (err) {
    console.log(err)
  } else {
       console.log(result);
    console.log(web3.utils.fromWei(result, "ether") + " ETH")
  }
}) 
callback();
						// var BTCwallet = new Wallets_datas(
						// {
							// user:userName,
							// crypto:[{
								// name: "eth",
								// pubkeys:account.xpub,
								// privkeysid: account.xpriv,
								// balance: 0,
								// walletid:wallet.guid,
                                // receiveaddress:address.address
							// }]
						// });
							// BTCwallet.save(function (err) {
								// if (err) return handleError(err);
                                // callback(BTCwallet);
							// });

			});
		}
	});
}

module.exports.createWallet = createWallet;
