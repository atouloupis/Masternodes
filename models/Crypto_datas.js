const mongoose = require('mongoose');

const crypto_datasSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  symbol: {
  type: String,
  trim: true,
  },
  crypto_name: {
    type: String,
    trim: true,
  },
  creationDate: {
    type: Date,
    trim: true,
  },
    serverId: {
    type: String,
    trim: true,
  },
    crypto: {
    type: String,
    trim: true,
  },
    user: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Crypto_datas', crypto_datasSchema);

