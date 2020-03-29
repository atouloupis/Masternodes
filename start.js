const app = require('./app.js');

const server = app.listen(3000, () => {
	console.log('Express is running on port ${server.adress().port}');
});
