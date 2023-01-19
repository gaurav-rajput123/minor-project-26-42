const getRouter = require("express").Router();

getRouter.get("/mongo", async (req, res) => {
  try {
    console.log(req.headers.host);

    res.send("pl");
  } catch (error) {}
});

module.exports = { getRouter };
