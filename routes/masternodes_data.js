const path = require('path');
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
const Crypto_datas = mongoose.model('Crypto_datas');
const createMNscript = require(path.join(__dirname,'../src/walletsManagement/MNinstall/createMN'));
const async = require('asyncawait/async');
const await = require('asyncawait/await');



function MNdata(res){
	var MNinfo = {totalTokenEur:0,totalgainperweekEur:0,totalTokenBtc:0,totalgainperweekBtc:0,summary:[]};
	var MNsummary={masternodes:[]};
	Cryptodatas(function(cryptodatas){
	Masternodes.find().then((masternodes) => {
		masternodes.forEach( masternode =>{
			cryptodatas.forEach(cryptodata =>{
				if (cryptodata.symbol==masternode.symbol){ 
				var priceEur=cryptodata.market_data.current_price.eur;
				var priceBtc=cryptodata.market_data.current_price.btc;
			MNinfo.totalTokenBtc=MNinfo.totalTokenBtc+masternode.totalToken*priceBtc;
			MNinfo.totalgainperweekBtc=MNinfo.totalgainperweekBtc+masternode.gainperweek*priceBtc;
			MNinfo.totalTokenEur=MNinfo.totalTokenEur+masternode.totalToken*priceEur;
			MNinfo.totalgainperweekEur=MNinfo.totalgainperweekEur+masternode.gainperweek*priceEur;
			const exist = MNinfo.summary.find(exist => exist.crypto == masternode.crypto);
			if (exist==undefined)
			{
				var item1 = {'crypto' : masternode.crypto, 'count': 1,'totalEur':masternode.totalToken*priceEur,'totalBtc':masternode.totalToken*priceBtc,'gainperweekEur':masternode.gainperweek*priceEur,'gainperweekBtc':masternode.gainperweek*priceBtc};
				MNinfo.summary.push(item1);
			}
			else {
				i = 0;
				for (i=0; i<MNinfo.summary.length;i++)
				{
					if(MNinfo.summary[i].crypto==masternode.crypto)
					{
						MNinfo.summary[i].count=MNinfo.summary[i].count+1;
						MNinfo.summary[i].totalEur=MNinfo.summary[i].totalEur+masternode.totalToken*priceEur;
						MNinfo.summary[i].totalBtc=MNinfo.summary[i].totalBtc+masternode.totalToken*priceBtc;
						MNinfo.summary[i].gainperweekEur=MNinfo.summary[i].gainperweekEur+masternode.gainperweek*priceEur;
						MNinfo.summary[i].gainperweekBtc=MNinfo.summary[i].gainperweekBtc+masternode.gainperweek*priceBtc;
					}
				}
			}
			MNsummary.masternodes.push(masternode);
			}});
		});
		MNsummary=Object.assign(MNinfo,MNsummary);
		console.log(MNsummary);
		res(MNsummary);
	})
	});
}

function Cryptodatas(res){
	Crypto_datas.find().then((Cryptodatas) => {
		res(Cryptodatas);
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

module.exports.MNdata = MNdata;
exports.createMN = createMN;
