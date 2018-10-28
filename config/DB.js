// DB.js
require('dotenv').config();


let db = {
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

module.exports = {
   DB: `mongodb://${ db.username }:${ db.password }@${ db.host }:${ db.port }/${ db.name }`
};
