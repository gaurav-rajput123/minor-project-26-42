const { Model } = require("mongoose");
let { mongoClient } = require("./../data-fetch-functions/mongo_client");

let userSchema = new mongoClient.Schema({
  host: {
    type: String,
    unique: true,
  },
  salt: String,
});

let userModelSchema = new mongoClient.Schema({
  host: String,
  model: String,
  schema: Object,
});

const userModel = mongoClient.model("userModel", userSchema);
const userModelWithSchema = mongoClient.model(
  "userModelSchema",
  userModelSchema
);

module.exports = { userModel, userModelWithSchema };
