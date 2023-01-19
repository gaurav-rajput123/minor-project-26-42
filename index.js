const express = require("express");
const mongoose = require("mongoose");
const { mongoClient } = require("./data-fetch-functions/mongo_client");
const { getRouter } = require("./routers/getRouter");
const { postRouter } = require("./routers/postRouter");
const { makeSchema } = require("./schemas_models/schemaGenerator");
const { userModel } = require("./schemas_models/users-and-keys");
const cors = require("cors");
// create the main router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  console.log(req.hostname);
  next();
});
// using different routers
app.use("/get", getRouter);
app.use("/post", postRouter);

// listening at port 8080
app.listen(8080, () => {
  console.log("running on port 8080");
});
