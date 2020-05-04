const mongoose = require('mongoose');

const walletsdatasSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Wallets_datas', walletsdatasSchema);


