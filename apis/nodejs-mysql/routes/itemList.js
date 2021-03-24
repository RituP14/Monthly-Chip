const express = require("express");
const router = express.Router();
const list = require("../services/itemList");

/* GET items listing. */

router.get("/", async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(await list.getItemList());
  } catch (err) {
    console.error("Error while getting list", err.message);
    next(err);
  }
});
module.exports = router;
