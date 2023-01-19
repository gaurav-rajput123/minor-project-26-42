const mongoose = require("mongoose");

async function createModel(mongoose, schema, connectionString, modelName) {
  try {
    let connection = mongoose.createConnection(connectionString);
    let newModel = connection.model(modelName, schema);
    return newModel;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { createModel };
