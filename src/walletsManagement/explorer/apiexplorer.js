module.exports.getMNInfos=getMNInfos;
const path = require('path');
var restFull = require(path.join(__dirname,'../../tools/restFullApi'));
var oneweektime=(Date.now()/1000)-(7*24*60*60);
const async = require('asyncawait/async');
const await = require('asyncawait/await');


function getMNInfos(crypto,pubkey,callback)
{
	if (pubkey==undefined){callback()}else{
		if (crypto=='Energi')
		{
			energiMasternodes(pubkey,function(masternodeStatus){
				energiWallet(pubkey,function(masternodeValue){
					energiBalance(pubkey,function(masternodeBalance){
						callback(Object.assign(masternodeStatus, masternodeValue, masternodeBalance));
					});
				});
			});
		}
		if(crypto=='Iqcash')
		{
			iqcashMasternodes(pubkey,function(masternodeValue){
				iqcashBalance(pubkey,function(masternodeBalance){
					iqcashWallet(pubkey,function(masternodeTx){
					callback(Object.assign(masternodeValue, masternodeBalance,masternodeTx));
					});
				});
			});
		}
	}
}

function energiMasternodes(pubkey,callback){
	var options1 = {
		'method': 'POST',
		'hostname': 'nodeapi.energi.network',
		'path': '/',
		'headers': {
			'Content-Type': 'application/json'
		},
		'maxRedirects': 20
	};
	restFull.postRestFull(options1,{"jsonrpc":"2.0","id":7,"method":"masternode_listMasternodes","params":[]},function(err,response){
		if (err) throw(err);
		response.result.forEach(masternodes =>{
			if(masternodes.Owner==pubkey){
				callback(JSON.parse(JSON.stringify({"isactive":masternodes.IsActive})))
				}
		});
	});
}


function energiWallet(pubkey,callback){
	var options= {
		host: "explorer.energi.network",
		path: "/api?module=account&action=txlistinternal&address="+pubkey,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,response){
		if (err) throw(err);
		var totalgain=0;
		var gainperweek=0;
		var lastTimestamp=0;
		response.result.forEach(transaction =>{
			totalgain=transaction.value/1000000000000000000+totalgain;
			if (transaction.timeStamp>oneweektime){gainperweek=transaction.value/1000000000000000000+gainperweek;}
			if (transaction.timeStamp>lastTimestamp){lastTimestamp=transaction.timeStamp}
		});
		callback(JSON.parse(JSON.stringify({"gainsincecreated":totalgain,"gainperweek":gainperweek,"lastpaid":new Date(lastTimestamp*1000)})));
	});
}
function energiBalance(pubkey,callback){
	var options = {
		host: "explorer.energi.network",
		path: "/api?module=account&action=balance&address="+pubkey,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,response){
		if (err) throw(err);
		balance=response.result/1000000000000000000;
		callback(JSON.parse(JSON.stringify({"totalToken":balance+1000})));
	});

}

function iqcashMasternodes(pubkey,callback){
	var options = {
		host: "explorer.iq.cash",
		path: "/api/masternodes/list",
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,response){
		if (err) throw(err);
		response.forEach(masternode =>{
			if (masternode.address==pubkey){
				if (masternode.status=="ENABLED"){
					callback(JSON.parse(JSON.stringify({"lastpaid":new Date(masternode.lastpaidtime*1000),"isactive":true})));
				} else {
					callback(JSON.parse(JSON.stringify({"lastpaid":new Date(masternode.lastpaidtime*1000),"isactive":false})));
				}
			}
		});
	});
}
function iqcashBalance(pubkey,callback){
	var options = {
		host: "explorer.iq.cash",
		path: "/ext/getbalance/"+pubkey,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,balance){
		if (err) throw(err);
		callback(JSON.parse(JSON.stringify({"totalToken":balance})));
	});
}

function iqcashWallet(pubkey,callback){
	var gainperweek=0;
	var options = {
		host: "explorer.iq.cash",
		path: "/ext/getaddress/"+pubkey,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,txList){
		if (err) throw(err);
		
		setTimeout(iqcashTx,300,txList,pubkey,function(txgain){
			callback(JSON.parse(JSON.stringify({"gainsincecreated":txList.received-3000,"gainperweek":txgain})));
		});
	});
}

function iqcashTx(txList,pubkey,callback){
	var sumtxgain=0;
	var count=1;
	for (var i=0;i<txList.last_txs.length;i++){
		var tx=txList.last_txs[i];
		if (tx.type=="vout") {
			var options1 = {
				host: "explorer.iq.cash",
				path: "/api/getrawtransaction?txid="+tx.addresses+"&decrypt=1",
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				maxRedirects:20
			};
			restFull.getRestFull(options1,function(err,txDetail){
				if (err) throw(err);
				iqcashTxgain(txDetail,pubkey,function(txgain){
					count++;
					sumtxgain=txgain+sumtxgain;
					if (count==txList.last_txs.length){callback(sumtxgain)}
				});
			});
		}
	}
}

function iqcashTxgain(txDetail,pubkey,callback){
	if(txDetail.time>oneweektime){
	var count1=0;
	var txgain=0;
	txDetail.vout.forEach(tx =>{
		if(tx.scriptPubKey.addresses[0]==pubkey){
			if(tx.value!=3000){txgain=txgain+tx.value;}
		}
		count1++;
		if(txDetail.vout.length==count1){callback(txgain);}
	});
	}
}