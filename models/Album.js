var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Album = new Schema({
  id: {
    type: String
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
    type: String
  },
  updated: {
    type: String
  }
},{
    collection: 'albums'
});

module.exports = mongoose.model('Album', Album);
