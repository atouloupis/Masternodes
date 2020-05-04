//
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');

function Walletsdatas(res){
	Wallets_datas.find().then((Walletsdatas) => {
		res(Walletsdatas);
	})
}

module.exports.Walletsdatas = Walletsdatas;
