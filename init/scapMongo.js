var mongo = require('../src/tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;

listmasternodes=[
{
	serverName:"Scap1",
	crypto:"Scap",
	pubkey:"CYmQvRX4wtjTsq2TpfBc9RfSL7dY3vFCsU",
	collateral:1000,
	symbol:'scap'
}
]

mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    dbase = db.db("masternode");
		mongo.insertCollection(dbase,'masternodes', listmasternodes, function() {});

});
