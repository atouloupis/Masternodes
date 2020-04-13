var Ansible = require ('node-ansible');
var crypto='Axel';
var serverName='Axel1';	
const path = require('path');


var command = new Ansible.Playbook().playbook(path.join(__dirname,"src/walletsManagement/MNinstall/"+crypto+"_create")).variables({serverName:serverName,SCW_API_KEY:"SCW7JVYVXWJ43ZCZNQ0W"}).inventory(path.join(__dirname,"temp-host"));
			command.on('stdout', function(data) { console.log(data.toString()); });
			command.on('stderr', function(data) { console.log(data.toString()); });
			// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
			var promise = command.exec();
			promise.then(function(result) {
			});