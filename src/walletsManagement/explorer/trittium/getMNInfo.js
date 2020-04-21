//Get MNT Information for Axel Telos Scap StreamIT
const path = require('path');
var restFull = require(path.join(__dirname,'../../../tools/restFullApi'));
module.exports.synthesis=synthesis;
module.exports.txList=txList;

function synthesis(crypto,callback){
		var options = {
        host: "chains.trittium.cc",
        path: "/coreapi/v1/coins/"+crypto+"/masternodes",
        method: 'GET',
	    headers: {
            'Content-Type': 'application/json'
        },
		maxRedirects:20
    };
	restFull.getRestFull(options,function(err,response){
		if (err) throw(err);
		callback(response);
	});
}


function txList(crypto,address,callback){
			var options = {
        host: "chains.trittium.cc",
        path: "/coreapi/v1/coins/"+crypto+"/address/"+address+"?perPage=100000&page=1",
        method: 'GET',
	    headers: {
            'Content-Type': 'application/json'
        },
		maxRedirects:20
    };
	restFull.getRestFull(options,function(err,response){
		if (err) throw (err);
		callback(response);
	});
}