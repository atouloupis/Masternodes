var mongo = require('../mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    dbase = db.db("masternode");
mongo.createCollection (dbase,'masternodes',function(){
mongo.createCollection (dbase,'cryptodata',function(){
	db.close();
});	
});
});