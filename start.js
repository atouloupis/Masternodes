require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
  
require('./models/Registration');
require('./models/Masternodes');
require('./models/Crypto_datas');
require('./models/Wallets_datas');
require('./models/Transactions_datas');
const app = require('./app');

const server = app.listen(3000, () => {
	console.log(`Express is running on port ${server.address().port}`);
});

const io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    console.log('a user connected');
	socket.on('message', function (message) {
	console.log(message);
	});
});

exports.io = io;