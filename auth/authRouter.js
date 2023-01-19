const e = require("express");
const { mongoRouter } = require("../dbs/mongoRouter");
const authRouter = e.Router();

authRouter.use("/mongo", mongoRouter);
module.exports = { authRouter };
