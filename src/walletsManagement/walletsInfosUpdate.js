require('../../models/Masternodes');
require('dotenv').config({path: '../../.env' });
const path = require('path');
var mongo = require(path.join(__dirname,'../tools/mongoDb'));
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
var getTrittiumMNInfos=require(path.join(__dirname,'./explorer/trittium/getMNInfo'));
var oneweektime=(Date.now()/1000)-(7*24*60*60);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connection
  // .on('open', () => {
    // console.log('Mongoose connection open');
  // })
  // .on('error', (err) => {
    // console.log(`Connection error: ${err.message}`);
  // });

Masternodes.find().then((masternodes) => {
	masternodes.forEach( item =>{
		item=JSON.stringify(item);
		item=JSON.parse(item);
		//if axel, telos, scap go trittium
		if (item.crypto=="Energi")
		{
		}
		else if (item.crypto.match(/^(Telos|Scap|Axel)$/))
		{
			getTrittiumMNInfos.synthesis(item.crypto.toUpperCase(),function (Synthesis){
				Synthesis.response.forEach( MNitem =>{
					if (MNitem.addr==item.pubkey){
						console.log(item.serverName+" : "+MNitem.status+"  last paid : "+(Date.now()-new Date(MNitem.lastpaid*1000))/1000/60/60+" active time : "+(MNitem.activetime/60/60/24));
						}
				});
				getTrittiumMNInfos.txList(item.crypto.toUpperCase(),item.pubkey,function (TxList){
					var MNbalance=TxList.response.balance;
					var gainperweek=0;
					var gainsincecreate=0;
					TxList.response.transactions.forEach(transaction =>{
						if (transaction.amount!=transaction.balance && parseInt(transaction.amount)>0){
							gainsincecreate=parseInt(transaction.amount)+gainsincecreate;
							if (transaction.time>oneweektime){
								gainperweek=parseInt(transaction.amount)+gainperweek;
							}
						}
					});
					console.log(item.serverName+"  gain per week  "+gainperweek+"  total gain  "+gainsincecreate);
				});
			});
		}
		else{}
	});

});
