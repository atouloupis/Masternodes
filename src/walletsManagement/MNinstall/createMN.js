//Axel masternode creation
const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var Ansible = require ('node-ansible');
module.exports.main = main;
var mongo = require('../../tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;
var scaleway = require('../../tools/vps/scalewayApi');
var jsonfile = require('jsonfile');
var fs = require('fs');


function main(user, crypto){
//Récupérer le dernier ID de masternode
	mongoClient.connect(urlMasternode, { useUnifiedTopology: true }, function(err, db) {
		if (err) throw err;
		dbase = db.db("masternode");
		query={crypto:crypto,user:user};
		mongo.findRecords(dbase,'masternodes', query, {_id: -1}, function(res){
			var nb = res.length;
			//Appeler "createserv" avec en intput: Axel&ID
			var serverName=crypto+nb;
			if (crypto=="Energi"){
				scaleway.postNewServer(serverName,'f974feac-abae-4365-b988-8ec7d1cec10d',crypto,user,function(response){
					var serverId=response.ops[0].serverId;

				//Wait server is creating
				setTimeout(masternodeDeploy,60000,serverId, serverName,crypto,function(MNinfos){
					db.close();
					return MNinfos
					});
				});
			}
			else{
				scaleway.postNewServer(serverName,'3d6804e0-086e-4a06-8124-7240a657668d',crypto,user,function(response){
					var serverId=response.ops[0].serverId;

				//Wait server is creating
				setTimeout(masternodeDeploy,60000,serverId, serverName,crypto,function(MNinfos){
					console.log("CreateMN");
					console.log(MNinfos);
					db.close();
					return MNinfos
					});
				});
			}
			
		});
	}); 
}
// --- Configurer le serveur Axel ----
// Appeler le script ansible Axel avec en input la config du serveur

function masternodeDeploy(serverId,serverName,crypto,callback){
	//Récupérer l'IP
	scaleway.getServerInfos(serverId,function(res){
		var serverIp=res.publicIp;
		createHostFile(serverIp, function(){
			jsonfile.readFile(keyfile, function (err, obj) {
				var command = new Ansible.Playbook().playbook(path.join(__dirname,crypto+"_create")).variables({serverName:serverName,SCW_API_KEY:obj.scalewayApi.pkey}).inventory(path.join(__dirname,"../../../temp-host"));
				command.on('stdout', function(data) { console.log(data.toString()); });
				command.on('stderr', function(data) { console.log(data.toString()); });
				// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
				var promise = command.exec();
				promise.then(function(result) {
					jsonfile.readFile(path.join(__dirname,".output_data_"+serverName+".json"), function (err, obj) {
						if (err) throw err;
						var MNobj = {$set:{
						'backup':path.join(__dirname,"/backup/.backup_"+serverName),
						'masternodeprivatekey':obj.masternodeprivkey,
						'pubkey':obj.pubKey,
						'ip':serverIp,
						'collateral':collateral,
						'status':"installed"
						}};
						var query={'serverName':serverName};
						mongoClient.connect(urlMasternode, { useUnifiedTopology: true }, function(err, db) {
							if (err) throw err;
							dbase = db.db("masternode");
							mongo.updateCollection(dbase,'masternodes', query, MNobj, function(res){
								fs.unlink(".output_data_"+serverName+".json",function(err){if (err) throw err;});
								callback(MNobj);
							});
						});
					});
				});
			});
		});
	});
}


function createHostFile(serverIp, callback){
	var content='[current]\n'+serverIp;
	fs.writeFile('temp-host',content, function (err) {
		if (err) throw err;
		callback('done');
	});
}
