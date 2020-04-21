require('../../models/Masternodes');
require('dotenv').config({path: '../../.env' });
const path = require('path');
var mongo = require(path.join(__dirname,'../tools/mongoDb'));
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
var getTrittiumMNInfos=require(path.join(__dirname,'./explorer/trittium/getMNInfo'));
var oneweektime=(Date.now()/1000)-(7*24*60*60);
var apiexplorer=require(path.join(__dirname,'./explorer/apiexplorer'));

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

		if (item.crypto.match(/^(Telos|Scap|Axel)$/))
		{
			getTrittiumMNInfos.synthesis(item.crypto.toUpperCase(),function (Synthesis){
				var counter1=0;
				var counter2=0;
				Synthesis.response.forEach( MNitem =>{
					counter1++;
					if (MNitem.addr==item.pubkey){
						counter2++;
						console.log(item.serverName+" : "+MNitem.status+" active time : "+(MNitem.activetime/60/60/24));
						}
					if (counter1==Synthesis.response.length && counter2==0){console.log(item.serverName+" : OFFLINE active time : 0");}
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
					var lastpaid=0;
					if (TxList.response.address!='undefined'){
						lastpaid=(Date.now()-new Date(TxList.response.transactions[0].time)*1000)/1000;
						}
					console.log(item.serverName+"  gain per week  "+gainperweek+"  total gain  "+gainsincecreate+"  last paid(s) : "+lastpaid);
				});
			});
		}
		else{
			apiexplorer.getMNInfos(item.crypto,item.pubkey,function(MNinfos){
				console.log(MNinfos);
			});
			
		}
	});
});
