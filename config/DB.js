// DB.js
require('dotenv').config();


let database = {
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}


module.exports = {
   DB: 'mongodb://database.username:database.password@database.host:37723/database.name'
};
