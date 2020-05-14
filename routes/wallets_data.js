const BTCbalance = require('../src/walletsManagement/bitcoinWallet/bitcoinBalance');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');
const Crypto_datas = mongoose.model('Crypto_datas');
const BTCfee = require('bitcoin-fee');
global.fetch = require('node-fetch');


function Walletsdatas(userName,callback){
  var services=BTCfee.SERVICES;
    BTCfee.fetchFee(services[0]).then((fee) => {console.log(fee)});

    var count=0;
    var Walletsdatasconcat={"totalBalanceBtc": 0,"totalBalanceEur": 0,"btc":[], "eth":[]};
	Wallets_datas.find({user:userName}).then((Walletsdatas,error) => {
        if (error) return handleError(error);
        if (Walletsdatas[0]!=undefined){
		Walletsdatas[0].crypto.forEach( crypto => {
            Crypto_datas.find().then((cryptodatas) => {
                if (crypto.name=='btc'){
                    cryptodatas.forEach(cryptodata =>{
                        if (cryptodata.symbol=='btc'){
                            var priceBtc=cryptodata.market_data.current_price.btc;
                            var priceEur=cryptodata.market_data.current_price.eur;
                            BTCbalance.balancePubkey(crypto.receiveaddress,function (res){
                                var services=BTCfee.SERVICES;
                                BTCfee.fetchFee(services[0]).then((fee) => {
                                    var fee=0.00000001*fee;
                                    Walletsdatasconcat.btc=Object.assign(crypto,res,{fee:fee});
                                    Walletsdatasconcat.totalBalanceBtc=Walletsdatasconcat.totalBalanceBtc+(res*priceBtc);
                                    Walletsdatasconcat.totalBalanceEur=Walletsdatasconcat.totalBalanceEur+(res*priceEur);
                                    count++;
                                    if (count==Walletsdatas[0].crypto.length) {callback(Walletsdatasconcat);}
                                });
                            });
                        }
                    });
                }
			});
        });
        }
        else {callback(Walletsdatasconcat);}
	});

}

module.exports.Walletsdatas = Walletsdatas;
