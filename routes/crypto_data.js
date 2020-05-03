//
const mongoose = require('mongoose');
const Crypto_datas = mongoose.model('Crypto_datas');

function Cryptodata(res){
	Crypto_datas.find().then((Cryptodatas) => {
		res(Cryptodatas);
	})
}

module.exports.Cryptodata = Cryptodata;
