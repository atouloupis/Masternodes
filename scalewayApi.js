// module.exports.getServersList=getServersList;
// module.exports.postNewServer=postNewServer;

// var keyfile = './key.json';
// var jsonfile = require('jsonfile');
// var restFull = require('./restFullApi');


// function getServersList(callback){
// jsonfile.readFile(keyfile, function (err, obj) {
	// if (err) throw err;
	// var options = {
        // host: "api.scaleway.com",
        // path: "/instance/v1/zones/fr-par-1/servers/",
        // method: 'GET',
	    // headers: {
            // 'Content-Type': 'application/json',
			// 'X-Auth-Token' : obj.scalewayApi.skey
        // }
    // };

	
	// restFull.getRestFull(options,function(err,response){
	// callback(response);
	// });
// });
// }

// function postNewServer(serverName,tag1,tag2,callback){
// jsonfile.readFile(keyfile, function (err, obj) {
	// if (err) throw err;
	// var options = {
        // host: "api.scaleway.com",
        // path: "/instance/v1/zones/fr-par-1/servers/",
        // method: 'POST',
	    // headers: {
            // 'Content-Type': 'application/json',
			// 'X-Auth-Token' : obj.scalewayApi.skey
        // }
    // };
	
	// var body = {
			// 'name':serverName,
			// 'commercial_type':'DEV1-S',
			// 'image':'3d6804e0-086e-4a06-8124-7240a657668d',
			// 'organization':'92098415-46b0-43ef-90ef-727182f4c3b5',
			// 'tags': [tag1,tag2]
		// };	
	// restFull.postRestFull(options,body,function(err,response){
			// var serverId=response.server.id;

	// options.path = '/instance/v1/zones/fr-par-1/servers/'+serverId+'/action/';
	// body = { 'action':'poweron'};
	// restFull.postRestFull(options,body,function(err,response){
	// callback(response); 
	// });
// });
// });
// }