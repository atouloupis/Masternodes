require('../../models/Crypto_datas');
const toJsonSchema = require('to-json-schema');
const path = require('path');
require('dotenv').config({path: path.join(__dirname,'../../.env') });
const mongoose = require('mongoose');
const Crypto_datas = mongoose.model('Crypto_datas');

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

//1. Import coingecko-api
const CoinGecko = require('coingecko-api');
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();
var coinList=['axel','energi','safecapital','streamit-coin','telos-coin','iq-cash','bitcoin','ethereum'];
// var coinList=['bitcoin'];
//3. Make calls
var getCoinGeckoData = async(cryptoId) => {
	let data = await CoinGeckoClient.coins.fetch(cryptoId,{});
	data=JSON.parse(JSON.stringify(data.data));
	let doc = Crypto_datas.findOneAndUpdate({'id':cryptoId}, {"$set":data}, {new: true,useFindAndModify:false, upsert: true, setDefaultsOnInsert: true },(err, doc) => {if (err)throw (err);console.log(doc);});
};

var allCoinInfos= async() => {
	count=0;
	let endloop =  await coinList.forEach(async(cryptoId) =>{
		count++;
		let data = await getCoinGeckoData(cryptoId);
	});
};

let test = allCoinInfos();
function closeConnection(){mongoose.connection.close();}
setTimeout(closeConnection,10000);
