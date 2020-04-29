require('../../models/Masternodes');
const path = require('path');
require('dotenv').config({path: path.join(__dirname,'../../.env') });
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
var getTrittiumMNInfos=require(path.join(__dirname,'./explorer/trittium/getMNInfo'));
var oneweektime=(Date.now()/1000)-(7*24*60*60);
var apiexplorer=require(path.join(__dirname,'./explorer/apiexplorer'));

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
function closeMongoose (){mongoose.connection.close();}

Masternodes.find().then((masternodes) => {
	masternodes.forEach( item =>{
		item=JSON.parse(JSON.stringify(item));
		if(item.pubkey!="" && item.pubkey!=undefined){
		//if axel, telos, scap go trittium
	const filter = { serverName: item.serverName };
		if (item.crypto.match(/^(Telos|Scap|Axel)$/))
		{
			getTrittiumMNInfos.synthesis(item.crypto.toUpperCase(),function (Synthesis){
				var counter1=0;
				var counter2=0;
				Synthesis.response.forEach( MNitem =>{
					counter1++;
					if (MNitem.addr==item.pubkey){
						counter2++;
						if (MNitem.status=="ENABLED"){var status=true;}else{var status=false;}
						var activetime=MNitem.activetime;
						const update = JSON.parse(JSON.stringify({$set:{ "isactive": status,
						"activetime":MNitem.activetime}}));
						let doc =  Masternodes.findOneAndUpdate(filter, update, {new: true,useFindAndModify:false},(err, doc) => {
							if (err)throw (err);
							console.log(doc);
						});
						}
					else if (counter1==Synthesis.response.length && counter2==0){
						var activetime=0;
						var status=false;
						const update = JSON.parse(JSON.stringify({$set:{ "isactive": false,
						"activetime":0}}));
						let doc =  Masternodes.findOneAndUpdate(filter, update, {new: true,useFindAndModify:false},(err, doc) => {
							if (err) throw (err);
							console.log(doc);
						});
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
					var lastpaid=0;
					if (TxList.response.address!='undefined'){
						lastpaid=(Date.now()-new Date(TxList.response.transactions[0].time)*1000)/1000;
						}
					const update = JSON.parse(JSON.stringify({$set:{"gainsincecreated": gainsincecreate,
					"gainperweek": gainperweek,
					"lastpaid": lastpaid,
					"totalToken": MNbalance}}));
					let doc =  Masternodes.findOneAndUpdate(filter, update, {new: true,useFindAndModify:false},(err, doc) => {
					if (err) throw (err);
					console.log(doc);
				});
				});
			});
		}
		else{
			apiexplorer.getMNInfos(item.crypto,item.pubkey,function(MNinfos){
				const update = JSON.parse(JSON.stringify({"$set":{}}));
				update.$set=MNinfos;
				let doc =  Masternodes.findOneAndUpdate(filter, update, {new: true,useFindAndModify:false},(err, doc) => {
					if (err)throw(err);
					console.log(doc);
					setTimeout(closeMongoose,15000);
				});
			});
		}
		}
	});
});
