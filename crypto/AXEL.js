//Axel masternode creation
var Ansible = require ('node-ansible');
//Récupérer le dernier ID de masternode
var nb = 1;

//Appeler "createserv" avec en intput: Axel&ID

var scaleway = require('../scaleway/scalewayApi');
var crypto='Axel';
var user='Andreas';
var serverName='Axel'+nb;

// scaleway.postNewServer('Axel',crypto,user,function(response){
var serverId=response.ops[0].serverId;
// });
//Wait
var time=Date.now();
setTimeout(masternodeDeploy,1000,"hoho",'hihi')
console.log(time-Date.now());

// --- Configurer le serveur Axel ----
// Appeler le script ansible Axel avec en input la config du serveur

function masternodeDeploy(publicIp,toto){
	//Récupérer l'IP
	scaleway.getServerInfos(serverId,res){
		var serverIp=res.server.public_ip.address;
		createHostFile(serverIp, function(){
		new Ansible.Playbook().playbook('axel.yml').variables({ip:serverIp});
		// ansible-playbook crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
		var promise = command.exec();
		};
	};
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