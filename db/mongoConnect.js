const mongoose = require('mongoose');
const {config} =require("../config/secret");
main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/');

  // await mongoose.connect(`mongodb+srv://kobiisraeli:alin2084@jewerly.y1lswc3.mongodb.net/jewlery
  // `);
  await mongoose.connect(config.MONGO_DB);
  

  // await mongoose.connect(config.MONGO_DB);
 
  console.log("mongos kobi is conect 333");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}