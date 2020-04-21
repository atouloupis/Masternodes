module.exports.getMNInfos=getMNInfos;
const path = require('path');
var restFull = require(path.join(__dirname,'../../../tools/restFullApi'));

function getMNInfos(crypto,pubkey,callback)
{
if (crypto=='Energi')
{
			var options = {
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
		console.log(response);
	});
}


callback(response);
}