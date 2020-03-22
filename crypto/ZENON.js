//Axel masternode creation
var Ansible = require ('node-ansible');
module.exports.main_zenon = main_zenon;
var mongo = require('../mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;
var scaleway = require('../scaleway/scalewayApi');
var crypto='Zenon';

function main_zenon(user, privKey){
//Récupérer le dernier ID de masternode
mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
	if (err) throw err;
	dbase = db.db("masternode");
	query={crypto:crypto,user:user};
	mongo.findRecords(dbase,'masternodes', query, {_id: -1}, function(res){
		console.log(res);
		var nb = res.length;
		db.close();
//Appeler "createserv" avec en intput: Zenon&ID

var serverName='Zenon'+nb;
scaleway.postNewServer(serverName,crypto,user,function(response){
var serverId=response.ops[0].serverId;

//Wait server is creating
setTimeout(masternodeDeploy,30000,serverId, privKey); //Input priv key
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
		var command = new Ansible.Playbook().playbook('Axel.yml').variables({my_priv_key:privKey}).inventory('./temp-host');
		
		// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
		var promise = command.exec();
		console.log(promise);
		promise.then(function(result) {
  console.log(result.output);
  console.log(result.code);
});
		});
	});
}

function createHostFile(serverIp, callback){
	var fs = require('fs');
	var content='[current]\n'+serverIp;
	fs.writeFile('temp-host',content, function (err) {
		if (err) throw err;
		console.log('Saved!');
		callback('done');
	});
}