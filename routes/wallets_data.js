const BTCbalance = require('../src/walletsManagement/bitcoinWallet/bitcoinBalance');
const mongoose = require('mongoose');
const Wallets_datas = mongoose.model('Wallets_datas');
const Crypto_datas = mongoose.model('Crypto_datas');

function Walletsdatas(userName,callback){
    var count=0;
    var Walletsdatasconcat={"totalBalance": 0,"btc":[], "eth":[]};
	Wallets_datas.find({user:userName}).then((Walletsdatas,error) => {
        if (error) return handleError(error);
        if (Walletsdatas[0]!=undefined){
		Walletsdatas[0].crypto.forEach( crypto => {
            Crypto_datas.find().then((cryptodatas) => {
                if (crypto.name=='btc'){
                    cryptodatas.forEach(cryptodata =>{
                        if (cryptodata.symbol=='btc'){
                            var priceBtc=cryptodata.market_data.current_price.btc;
                            BTCbalance.balancePubkey(crypto.receiveaddress,function (res){
                                Walletsdatasconcat.btc=Object.assign(crypto,res);
                                Walletsdatasconcat.balance=Walletsdatasconcat.balance+(res*priceBtc);
                                count++;
                                if (count==Walletsdatas[0].crypto.length) {callback(Walletsdatasconcat);}
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
