var Ansible = require ('node-ansible');
var crypto='Axel';	
var serverName='Axel0';	
const path = require('path');


var command = new Ansible.Playbook().playbook(path.join(__dirname,"src/walletsManagement/MNinstall/"+crypto+"_create")).variables({serverName:serverName}).inventory('./temp-host');
			command.on('stdout', function(data) { console.log(data.toString()); });
			command.on('stderr', function(data) { console.log(data.toString()); });
			// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
			var promise = command.exec();
			promise.then(function(result) {
			});