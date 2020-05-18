require('../../../models/Wallets_datas');
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function balancePubkey(pubkey,callback){
    var exist=undefined;
	jsonfile.readFile(keyfile, function (err, obj) {
		if (err) return handleError(err);
		var projectid=obj.infura.projectid;

        const Web3 = require("web3")

        const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/"+projectid))

        web3.eth.getBalance(pubkey, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(web3.utils.fromWei(result, "ether"));
            }
        }) 

    });
}

module.exports.balancePubkey = balancePubkey;
