const e = require("express");
const { findByOrigin } = require("../data-fetch-functions/findUserByUserModel");
const mongoRouter = e.Router();

mongoRouter.post("/getme", async (req, res) => {
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

module.exports = { mongoRouter };
