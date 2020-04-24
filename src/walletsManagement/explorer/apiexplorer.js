module.exports.getMNInfos=getMNInfos;
const path = require('path');
var restFull = require(path.join(__dirname,'../../tools/restFullApi'));
var oneweektime=(Date.now()/1000)-(7*24*60*60);

function getMNInfos(crypto,pubkey,callback)
{
	if (crypto=='Energi')
	{
		energiMasternodes(pubkey,function(masternodeStatus){
			energiWallet(pubkey,function(masternodeValue){
				callback(Object.assign(masternodeStatus, masternodeValue));
			});
		});
	}
	if(crypto=='Iqcash')
	{
		energiWallet(pubkey,function(masternodeValue){
		});
		
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
			if(masternodes.Owner==pubkey){callback(JSON.parse(JSON.stringify({"status":masternodes.IsActive})))}
		});
	});
}


function energiWallet(pubkey,callback){
	var options2 = {
		host: "explorer.energi.network",
		path: "/api?module=account&action=txlistinternal&address="+pubkey,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	console.log(options2);
	restFull.getRestFull(options2,function(err,response){
		if (err) throw(err);
		var totalgain=0;
		var gainperweek=0;
		var lastTimestamp=0;
		console.log(response);
		response.result.forEach(transaction =>{
			totalgain=transaction.value/1000000000000000000+totalgain;
			if (transaction.timeStamp>oneweektime){gainperweek=transaction.value/1000000000000000000+gainperweek;}
			if (transaction.timeStamp>lastTimestamp){lastTimestamp=transaction.timeStamp}
		});
		callback(JSON.parse(JSON.stringify({"gain":totalgain,"gainperweek":gainperweek,"lastepaid":new Date(lastTimestamp*1000)})));
	});
}

function iqcashWallet(pubkey,callback){
	var options = {
		host: "explorer.iq.cash",
		//path: "/ext/getbalance/"+pubkey,
		//path: "/address/"+pubkey,
		path: "/api/masternodes/list",
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	maxRedirects:20
	};
	restFull.getRestFull(options,function(err,response){
		if (err) console.log(err);
		console.log(response);
		var totalgain=0;
		var gainperweek=0;
		var lastTimestamp=0;
		// response.forEach(transaction =>{
			// totalgain=transaction.value/1000000000000000000+totalgain;
			// if (transaction.timeStamp>oneweektime){gainperweek=transaction.value/1000000000000000000+gainperweek;}
			// if (transaction.timeStamp>lastTimestamp){lastTimestamp=transaction.timeStamp}
		// });
		// callback(JSON.parse(JSON.stringify({"gain":totalgain,"gainperweek":gainperweek,"lastepaid":new Date(lastTimestamp*1000)})));
	});
}