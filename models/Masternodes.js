const mongoose = require('mongoose');

const masternodesSchema = new mongoose.Schema({
  serverName: {
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

module.exports = mongoose.model('Masternodes', masternodesSchema);

