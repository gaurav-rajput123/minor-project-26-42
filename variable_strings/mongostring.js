const env = require("dotenv");
env.config();

let connectionString = `mongodb+srv://omenUchiha:${process.env.mongoPassword}@cluster0.pimhin0.mongodb.net/?retryWrites=true&w=majority`;
console.log(connectionString);
module.exports = { connectionString };
