// var Ansible = require ('node-ansible');
// var crypto='Axel';
// var serverName='Axel1';	
// const path = require('path');


// var command = new Ansible.Playbook().playbook(path.join(__dirname,"src/walletsManagement/MNinstall/"+crypto+"_create")).variables({serverName:serverName,SCW_API_KEY:"SCW7JVYVXWJ43ZCZNQ0W"}).inventory(path.join(__dirname,"temp-host"));
			// command.on('stdout', function(data) { console.log(data.toString()); });
			// command.on('stderr', function(data) { console.log(data.toString()); });
			// ansible-playbook -v crypto/Axel.yml --extra-vars "ip=51.158.124.213" -i temp-host
			// var promise = command.exec();
			// promise.then(function(result) {
			// });
			
				const path = require('path');
var restFull = require(path.join(__dirname,'src/tools/restFullApi'));
	var options1 = {
				host: "explorer.iq.cash",
				path: "/api/getrawtransaction?txid=9bf0d073a198e6db1688ca9e65cbbf848c20b8d66c313bc6426933efc84b8efc&decrypt=1",
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
// 'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// 'Accept-Language':'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
// 'Cache-Control':'max-age=0',
// 'Connection':'keep-alive',
// 'Host':'explorer.iq.cash',
// 'If-None-Match':'W/"1037861682"',
// 'TE':'Trailers',
// 'Upgrade-Insecure-Requests':'1',
// 'User-Agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:75.0) Gecko/20100101 Firefox/75.0'
				},
				maxRedirects:20
			};
			 for (i=0;i<10;i++)
		 {clearInterval(x);
					 var x =setInterval(restFull.getRestFull,1000,options1,function(err,txDetail){
						 console.log(i);
				 });
				 
			}
			
			