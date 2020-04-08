const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
const Crypto_datas = mongoose.model('Crypto_datas');

//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async() => {
  let data = await CoinGeckoClient.ping();
};

function data( res){
	var MNinfo = [];
	Masternodes.find().then((masternodes) => {
		masternodes.forEach( masternodes =>{
			const exist = MNinfo.find(exist => exist.crypto == masternodes.crypto);
			if (exist==undefined)
			{
			var item1 = {'crypto' : masternodes.crypto, 'count': 1};
			MNinfo.push(item1);
			}
			else {
				i = 0;
				for (i=0; i<MNinfo.length;i++)
				{
				if(MNinfo[i].crypto==masternodes.crypto)
				{
					MNinfo[i].count=MNinfo[i].count+1
				}
				}
			}
		});
		console.log(MNinfo);
		res(MNinfo);
	})
}

module.exports.data = data;
