const e = require("express");
const { default: mongoose } = require("mongoose");
const { authRouter } = require("../auth/authRouter");
const {
  findByOrigin,
  getModel,
} = require("../data-fetch-functions/findUserByUserModel");
const { mongoClient } = require("../data-fetch-functions/mongo_client");
const { createModel } = require("../schemas_models/createModel");
const { userModelWithSchema } = require("../schemas_models/users-and-keys");
const { generateSaltAndSave } = require("../utils/generateSaltAndSave");

const postRouter = require("express").Router();

postRouter.use("/auth", authRouter);

postRouter.get("/mongo");

postRouter.post("/mongo/createSecretKey", async (req, res) => {
  try {
    const { password } = req.body;

    const createCallResult = await generateSaltAndSave(
      req.hostname,
      mongoClient,
      password
    );
    console.log("the call result for creating new key");
    console.log(createCallResult);
    return res.json({
      success: true,
      data: createCallResult,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
});
// error in production
postRouter.post("/mongo/savemodel", async (req, res) => {
  try {
    let { schema, secretKey, modelName } = req.body;
    let host = req.hostname;
    let findCall = await findByOrigin(host, secretKey);
    if (findCall.error) {
      return res.send("invalid");
    }
    let profile = findCall.data;
    let newConnectionString = `mongodb+srv://${host}:${profile.salt}@cluster0.pimhin0.mongodb.net/?retryWrites=true&w=majority`;
    let newClient = mongoose.createConnection(newConnectionString);
    let newSchema = new mongoose.Schema(schema);
    let newModel = mongoose.model(modelName, schema);
  } catch (error) {}
});

postRouter.post("/mongo/create-new-schema", async (req, res) => {
  try {
    let { schema, secretKey, modelName } = req.body;
    let host = req.hostname;
    let findCall = await findByOrigin(host, secretKey);
    if (findCall.error) {
      return res.send("invalid");
    }
    let saveNewModelCall = await userModelWithSchema.create({
      host: host,
      model: modelName,
      schema: schema,
    });
    res.json({
      data: saveNewModelCall,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

postRouter.post("/mongo/create-new-query", async (req, res) => {
  try {
    let { data, secretKey, modelName } = req.body;
    let host = req.hostname;
    console.log(req.body);
    let findCall = await findByOrigin(host, secretKey);
    if (findCall.error) {
      return res.send("invalid");
    }
    let schemaDetailsCall = await getModel(host, modelName);
    if (schemaDetailsCall.error) {
      console.log(schemaDetailsCall);
      res.send("invalid in postRouter");
    } else {
      // console.log(searchParameters);
      let keys = Object.keys(schemaDetailsCall.schema);
      console.log(keys);
      let newConfig = {};
      for (let key of keys) {
        newConfig[key] = mongoose.SchemaTypes.String;
      }
      console.log(newConfig);
      let newSchema = new mongoose.Schema(newConfig);
      let profile = findCall.data;
      let connectionString = `mongodb+srv://${host}:${profile.salt}@cluster0.pimhin0.mongodb.net/?retryWrites=true&w=majority`;
      let newModel = await createModel(
        mongoose,
        newSchema,
        connectionString,
        modelName
      );
      console.log(newModel);
      newModel
        .create(data)
        .then((res) => {
          console.log(res);
          res.json([res]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  } catch (error) {
    res.json(error);
  }
});

postRouter.post("/mongo/get-data", async (req, res) => {
  try {
    let { secretKey, modelName, searchParameters } = req.body;
    console.log(req.body);
    let host = req.hostname;
    console.log(host);
    let findCall = await findByOrigin(host, secretKey);
    if (findCall.error) {
      return res.send("invalid");
    }
    let schemaDetailsCall = await getModel(host, modelName);
    if (schemaDetailsCall.error) {
      console.log(schemaDetailsCall);
      res.send("invalid in postRouter");
    } else {
      console.log(schemaDetailsCall);
      let keys = Object.keys(schemaDetailsCall.data.schema);
      let newConfig = {};
      for (let key of keys) {
        newConfig[key] = mongoose.SchemaTypes.String;
      }
      console.log(newConfig);
      let newSchema = new mongoose.Schema(newConfig);
      let profile = findCall.data;
      let connectionString = `mongodb+srv://${host}:${profile.salt}@cluster0.pimhin0.mongodb.net/?retryWrites=true&w=majority`;
      let newModel = await createModel(
        mongoose,
        newSchema,
        connectionString,
        modelName
      );
      console.log(newModel);
      newModel
        .find(searchParameters)
        .then((e) => {
          console.log(e);
          res.json(e);
        })
        .catch((r) => console.log(r));
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

postRouter.post("/mongo/getme", async (req, res) => {
  try {
    let host = req.hostname;
    let { secretKey } = req.body;
    let findCall = await findByOrigin(host, secretKey);
    if (findCall.error) {
      return res.send("invalid");
    } else {
      return req.json(findCall.data);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { postRouter };
