const express = require("express");
const router = express.Router();
const list = require("../services/items");
const DemoAPI = require("../services/items");
/* GET items listing. */

router.get("/", async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(await list.getMultiple());
  } catch (err) {
    console.error("Error while getting list", err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(await list.create(req.body));
  } catch (err) {
    console.log("Error while posting list", err.message);
    next(err);
  }
});

router.delete("/itemList/:item_name", async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(await list.deleteItem(req.params.item_name));
  } catch (err) {
    console.log("Error while posting list", err.message);
    next(err);
  }
});

module.exports = router;
