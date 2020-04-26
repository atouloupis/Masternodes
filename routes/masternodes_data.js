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

function data(res){
	var MNinfo = {summary:[]};
	var MNsummary={masternodes:[]};
	Masternodes.find().then((masternodes) => {
		masternodes.forEach( masternode =>{
			const exist = MNinfo.summary.find(exist => exist.crypto == masternode.crypto);
			if (exist==undefined)
			{
			var item1 = {'crypto' : masternode.crypto, 'count': 1};
			MNinfo.summary.push(item1);
			}
			else {
				i = 0;
				for (i=0; i<MNinfo.summary.length;i++)
				{
				if(MNinfo.summary[i].crypto==masternode.crypto)
				{
					MNinfo.summary[i].count=MNinfo.summary[i].count+1;
				}
				}
			}
			MNsummary.masternodes.push(masternode);
		});
		MNsummary=Object.assign(MNinfo,MNsummary);
		console.log(MNsummary);
		res(MNsummary);
	})
}

const createMN = async ((io,crypto,user)=>{
	const promise = createMNscript.test(user, crypto);
	const MNinfos = await(promise);
	// console.log(MNinfos);
	// io.sockets.on('connection', function (socket) {
		      // var loadingbutton='Loading...';
		// socket.emit("loadingbutton",loadingbutton );
	// });
});

module.exports.data = data;
exports.createMN = createMN;
