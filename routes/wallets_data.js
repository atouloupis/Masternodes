const BTCbalance = require('../src/walletsManagement/bitcoinWallet/bitcoinBalance');
const ETHbalance=require('../src/walletsManagement/ethWallet/ethBalance');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');
const Crypto_datas = mongoose.model('Crypto_datas');
const BTCfee = require('bitcoin-fee');
global.fetch = require('node-fetch');


function Walletsdatas(userName,callback){
    var count=0;
    var Walletsdatasconcat={"totalBalanceBtc": 0,"totalBalanceEur": 0,"btc":[], "eth":[]};
	Wallets_datas.find({user:userName}).then((Walletsdatas,error) => {
        if (error) return handleError(error);
        if(Walletsdatas.length!=0){
        Walletsdatas.forEach(Walletsdata => {
		Walletsdata.crypto.forEach( crypto => {
            Crypto_datas.find().then((cryptodatas) => {
                if (crypto.name=='btc'||crypto.name=='eth'){
                    cryptodatas.forEach(cryptodata =>{
                        if (cryptodata.symbol=='btc'||cryptodata.symbol=='eth'){
                            var priceBtc=cryptodata.market_data.current_price.btc;
                            var priceEur=cryptodata.market_data.current_price.eur;
                            if (crypto.name=='btc'){
                            BTCbalance.balancePubkey(crypto.receiveaddress,function (res){
                                var services=BTCfee.SERVICES;
                                BTCfee.fetchFee(services[0]).then((fee) => {
                                    var fee=0.00000001*fee;
                                    Walletsdatasconcat.btc=Object.assign(crypto,res,{fee:fee});
                                    Walletsdatasconcat.totalBalanceBtc=Walletsdatasconcat.totalBalanceBtc+(res*priceBtc);
                                    Walletsdatasconcat.totalBalanceEur=Walletsdatasconcat.totalBalanceEur+(res*priceEur);
                                    count++;
                                    if (count==Walletsdatas.length+Walletsdata.crypto.length) {callback(Walletsdatasconcat);}
                                });
                            });
                            }
                            else if (crypto.name=='eth'){
                                ETHbalance.balancePubkey(crypto.receiveaddress,function (res){
                                var fee=0.01;
                                Walletsdatasconcat.eth=Object.assign(crypto,res,{fee:fee});
                                Walletsdatasconcat.totalBalanceBtc=Walletsdatasconcat.totalBalanceBtc+(res*priceBtc);
                                Walletsdatasconcat.totalBalanceEur=Walletsdatasconcat.totalBalanceEur+(res*priceEur);
                                count++;
                                if (count==Walletsdatas.length+Walletsdata.crypto.length) {callback(Walletsdatasconcat);}
                                });
                            }
                        }
                    });
                }
			});
        });
        });
        }
        else {callback(Walletsdatasconcat);}
	});

}

module.exports.Walletsdatas = Walletsdatas;
