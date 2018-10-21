var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Album = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  }
},{
    collection: 'albums'
});

module.exports = mongoose.model('Album', Album);
