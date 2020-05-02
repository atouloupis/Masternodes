var mongo = require('../src/tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;

listmasternodes=[
{
	serverName:Telos1,
	crypto:Telos,
	pubkey:
},
{
	serverName:Axel1,
	crypto:Axel,
	pubkey:
},
{
	serverName:Scap1,
	crypto:Scap,
	pubkey:
},
{
	serverName:Iqcash1,
	crypto:Iqcash,
	pubkey:
},
{
	serverName:Energi1,
	crypto:Energi,
	pubkey:
}
]

mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    dbase = db.db("masternode");
mongo.createCollection (dbase,'masternodes',function(){
	listmasternodes.forEach( masternode =>{
		mongo.insertCollection(dbase,'masternodes', masternode, function() {});
	});
mongo.createCollection (dbase,'cryptodata',function(){
	db.close();
});	
});
});