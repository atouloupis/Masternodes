const path = require('path');
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
const Crypto_datas = mongoose.model('Crypto_datas');
const createMNscript = require(path.join(__dirname,'../src/walletsManagement/MNinstall/createMN'));
const async = require('asyncawait/async');
const await = require('asyncawait/await');
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

const createMN = async ((crypto,user)=>{
	console.log("Create MN " + crypto);
	console.log("user "+user);
	console.log(createMNscript);
	const promise = createMNscript.main(user,crypto);
	const MNinfos = await(promise);
	console.log(MNinfos);
	return MNinfos;
})

module.exports.data = data;
exports.createMN = createMN;
