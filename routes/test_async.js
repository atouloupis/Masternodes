// async function getNombreAsynchrone1() {
	// setTimeout(value, 15000, function(callback){
		// return callback;
	// })
// }
// async function getNombreAsynchrone2() {return 2}

// async function getAdditionAsynchrone() {
 // const nombre1 = await getNombreAsynchrone1();
 // const nombre2 = await getNombreAsynchrone2();
 // console.log(nombre1);
 // console.log( nombre2);
 // return nombre1 + nombre2;
// }



// function value(){
	// callback(1);
// }

// module.exports.getAdditionAsynchrone=getAdditionAsynchrone;

function socketemit(io){
	io.sockets.on('connection', function (socket) {
		socket.emit('logged', "Le serveur vous salue !");
		socket.on('message', function (message) {
			console.log(message);
		});
	});
}
	module.exports.socketemit=socketemit;
