const { v3, v4 } = require("uuid");
const { userModel } = require("../schemas_models/users-and-keys");
const bcrypt = require("bcrypt");
const { json } = require("express");
const { jsonReturnHandler } = require("./returnHandler");

async function generateSaltAndSave(hostname, mongooseClient, password) {
  try {
    const createModelCall = await userModel.create({
      host: hostname,
      salt: password,
    });
    console.log(createModelCall);
    const secretKey = await bcrypt.hash(password, 10);
    console.log(secretKey);
    return jsonReturnHandler(
      {
        secretKey: secretKey,
      },
      null
    );
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

module.exports = { generateSaltAndSave };
