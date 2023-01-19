const {
  userModel,
  userModelWithSchema,
} = require("../schemas_models/users-and-keys");
const { jsonReturnHandler } = require("../utils/returnHandler");
const { mongoClient } = require("./mongo_client");
const bcrypt = require("bcrypt");

async function findByOrigin(origin, secretKey) {
  try {
    let userCall = await userModel.findOne({
      host: origin,
    });
    console.log(userCall);
    let isPasswordMatching = await bcrypt.compare(userCall.salt, secretKey);
    if (isPasswordMatching) {
      return jsonReturnHandler(userCall, null);
    } else {
      return jsonReturnHandler(null, {
        errorMessage: "invalid",
      });
    }
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

async function getModel(host, modelName) {
  try {
    let call = await userModelWithSchema.find({
      host: host,
      model: modelName,
    });
    console.log("log line 34 ", call);
    console.log(typeof call[0]?.schema);
    if (call.length > 0) {
      console.log("here");
      if (typeof call[0].schema == "object") {
        call[0].schema = JSON.stringify(call[0].schema);
      }
      console.log(call[0].schema);
      console.log(JSON.parse(call[0].schema));
    }
    return jsonReturnHandler(
      {
        host: host,
        model: modelName,
        schema: call.length > 0 ? JSON.parse(call[0].schema) : {},
      },
      null
    );
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}

module.exports = { findByOrigin, getModel };
