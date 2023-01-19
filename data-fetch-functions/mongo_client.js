const mongoose = require("mongoose");
const { connectionString } = require("../variable_strings/mongostring");

mongoose.connect(connectionString, (e) => {
  if (e) {
    console.log(e);
  }
});

module.exports = { mongoClient: mongoose };
