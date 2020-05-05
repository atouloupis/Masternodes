var mongo = require('../src/tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;

listmasternodes=[
{
	serverName:"Telos1",
	crypto:"Telos",
	pubkey:"GfACJnycG7T3zpYgHQty7An3wGvWjaWUU4",
	collateral:100000,
	symbol:'telos'
},
{
	serverName:"Axel1",
	crypto:"Axel",
	pubkey:"AP19DmpBphJsf8SqtZDgwB7qFFPQgbX8mJ",
	collateral:5000,
	symbol:'axel'
},
{
	serverName:"Scap1",
	crypto:"Scap",
	pubkey:"CZQQUBSWgPyLtg1CJccxGwuDG7qmEkNS86",
	collateral:1000,
	symbol:'scap'
},
{
	serverName:"Iqcash1",
	crypto:"Iqcash",
	pubkey:"QbY2sZMjWsW3tGNuHi3vgKVZtsLZhi2QrH",
	collateral:3000,
	symbol:'iq'
},
{
	serverName:"Energi1",
	crypto:"Energi",
	pubkey:"0x41035ec27017147C1735648368A269d0Ad635B51",
	collateral:1000,
	symbol:'nrg'
}
]

mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    dbase = db.db("masternode");
	mongo.createCollection (dbase,'masternodes',function(){
		mongo.insertCollection(dbase,'masternodes', listmasternodes, function() {});

		mongo.createCollection (dbase,'cryptodata',function(){
			mongo.createCollection (dbase,'wallets',function(){
				mongo.createCollection (dbase,'users',function(){
					db.close();
				});
			});
		});
	});
});