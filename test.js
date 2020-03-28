var Ansible = require ('node-ansible');
var crypto='Axel';	
var privKey='123';

var command = new Ansible.Playbook().playbook('./crypto/'+crypto).variables({my_priv_key:privKey}).inventory('./temp-host');
	console.log("Ansible command");
	command.on('stdout', function(data) { console.log(data.toString()); });
command.on('stderr', function(data) { console.log(data.toString()); });	
		// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
		var promise = command.exec();
		promise.then(function(result) {
				console.log("Ansible config runing");	
				console.log(result);
});