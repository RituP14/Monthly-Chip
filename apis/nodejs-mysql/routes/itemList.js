const express = require("express");
const router = express.Router();
const list = require("../services/itemList");

/* GET items listing. */

router.get("/", async function (req, res, next) {
  try {
    res.json(await list.getMultiple());
  } catch (err) {
    console.error("Error while getting list", err.message);
    next(err);
  }
});

module.exports = router;
