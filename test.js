var Ansible = require ('node-ansible');

var command = new Ansible.Playbook().playbook('./crypto/Axel').inventory('./temp-host');
// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
command.on('stdout', function(data) { console.log(data.toString()); });
command.on('stderr', function(data) { console.log(data.toString()); });		
var promise = command.exec();
