var blockexplorer = require('blockchain.info/blockexplorer');

function balancePubkey(pubkey,callback){

	blockexplorer.getBalance(pubkey).then(function (wallet,err) {
		if (err) return handleError(err);
		console.log(wallet);
		callback(wallet);
	});
}


module.exports.balancePubkey = balancePubkey;