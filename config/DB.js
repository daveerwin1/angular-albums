// DB.js
require('dotenv').config();

{
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}

module.exports = {
   DB: 'mongodb://database.username:database.password@ds237723.mlab.com:37723/albumsdb'
};
