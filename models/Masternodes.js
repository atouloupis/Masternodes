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
  gainsincecreated: {
    type: Number,
    trim: true,
  },
  gainperweek: {
    type: Number,
    trim: true,
  },
  lastpaid: {
    type: Date,
    trim: true,
  },
  totalToken: {
    type: Number,
    trim: true,
  },
  isactive: {
    type: Boolean,
    trim: true,
  },
  activetime: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('Masternodes', masternodesSchema);

