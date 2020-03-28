//Axel masternode creation
var Ansible = require ('node-ansible');
module.exports.main = main;
var mongo = require('../mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;
var scaleway = require('../scaleway/scalewayApi');
var crypto='Axel';

function main(user, privKey, crypto){
//Récupérer le dernier ID de masternode
mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
	if (err) throw err;
	dbase = db.db("masternode");
	query={crypto:crypto,user:user};
	mongo.findRecords(dbase,'masternodes', query, {_id: -1}, function(res){
		var nb = res.length;
		db.close();
//Appeler "createserv" avec en intput: Axel&ID

var serverName=crypto+nb;
scaleway.postNewServer(serverName,crypto,user,function(response){
var serverId=response.ops[0].serverId;

//Wait server is creating
setTimeout(masternodeDeploy,60000,serverId, privKey); //Input priv key
	});	
});
}); 

}
// --- Configurer le serveur Axel ----
// Appeler le script ansible Axel avec en input la config du serveur

function masternodeDeploy(serverId,privKey){
	//Récupérer l'IP
	scaleway.getServerInfos(serverId,function(res){
		var serverIp=res.publicIp;
		createHostFile(serverIp, function(){
var command = new Ansible.Playbook().playbook('./crypto/'+crypto).variables({my_priv_key:privKey}).inventory('./temp-host');
	command.on('stdout', function(data) { console.log(data.toString()); });
command.on('stderr', function(data) { console.log(data.toString()); });
		// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
		var promise = command.exec();
		promise.then(function(result) {
				console.log(result);
});
		});
	});
}

function createHostFile(serverIp, callback){
	var fs = require('fs');
	var content='[current]\n'+serverIp;
	fs.writeFile('temp-host',content, function (err) {
		if (err) throw err;
		callback('done');
	});
}