const express = require("express");
const { getItemList } = require("../services/itemList");
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

router.delete("/:id", async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    console.log("Came here");
  } catch (err) {
    console.log("Error while posting list", err.message);
    next(err);
  }
});

router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path, r.route);
  }
});

//router.delete("/itemList/:item_id", list.deleteItem.delete);

module.exports = router;
