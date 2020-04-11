//launch

const path = require('path');
var keyfile = path.join(__dirname, '../../../conf/key.json');
var Ansible = require ('node-ansible');
module.exports.main = main;
var mongo = require('../../tools/mongoDb');
var urlMasternode = "mongodb://localhost:27017/masternode";
var mongoClient = require('mongodb').MongoClient;
var scaleway = require('../../tools/vps/scalewayApi');
var jsonfile = require('jsonfile');


function main(serverName,user){
	mongoClient.connect(urlMasternode, { useUnifiedTopology: true}, function(err, db) {
		if (err) throw err;
		dbase = db.db("masternode");
		query={serverName:serverName,user:user};
		mongo.findRecords(dbase,'masternodes', query, function(MNinfos){
			masternodeLaunch(MNinfos,dbase,function(){});
			
		});
	}); 
}

function masternodeLaunch(MNinfos,dbase,callback){
	createHostFile(MNinfos.ip, function(){
		jsonfile.readFile(keyfile, function (err, obj) {
			var command = new Ansible.Playbook().playbook(path.join(__dirname,crypto+"_launch")).variables({serverName:MNinfos.serverName,pub_IP:MNinfos.ip,masternode_priv_key:MNinfos.masternodeprivkey,SCW_API_KEY:obj.scalewayApi.pkey}).inventory('./temp-host');
			command.on('stdout', function(data) { console.log(data.toString()); });
			command.on('stderr', function(data) { console.log(data.toString()); });
			// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
			var promise = command.exec();
			promise.then(function(result) {
				jsonfile.readFile(path.join(__dirname,"output_data_"+serverName), function (err, obj) {
					if (err) throw err;
					var MNobj = {
					txid:txid,
					status:"online"
					};
					var query={serverName:serverName};
					mongo.updateCollection(dbase,'masternodes', query, MNobj, function(res){
					});
				});
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