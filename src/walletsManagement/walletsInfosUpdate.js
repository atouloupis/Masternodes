require('../../models/Masternodes');
require('dotenv').config({path: '../../.env' });
const path = require('path');
var mongo = require(path.join(__dirname,'../tools/mongoDb'));
const mongoose = require('mongoose');
const Masternodes = mongoose.model('Masternodes');
var getTrittiumMNInfos=require(path.join(__dirname,'./explorer/trittium/getMNInfo'));


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
		console.log(item.pubkey);
		//if axel, telos, scap go trittium
		if (item.crypto=="Energi")
		{
		}
		else if (item.crypto.match(/^(Telos|Scap|Axel)$/))
		{
			getTrittiumMNInfos.synthesis(item.crypto.toUpperCase(),function (Synthesis){
				Synthesis.response.forEach( MNitem =>{
					if (MNitem.addr==item.pubkey){console.log(MNitem);}
				});
				//getTrittiumMNInfos.txList(item.crypto,item.pubkey,function (TxList){
					//console.log(TxList);
				//});
			});
		}
		else{}
	});

});
