var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Album = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  artist: {
    type: String
  },
  artist_alphabetical: {
    type: String
  },
  genre: {
    type: String
  },
  decade: {
    type: String
  },
  year: {
    type: String
  },
  description: {
    type: String
  },
  created: {
    type: Number
  },
  updated: {
    type: Number
  }
},{
    collection: 'albums'
});

module.exports = mongoose.model('Album', Album);
