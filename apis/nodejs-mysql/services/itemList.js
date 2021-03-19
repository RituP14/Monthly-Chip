const db = require("../services/db");

async function getMultiple() {
  const data = await db.query("SELECT item_id,item_name from itemList");
  const meta = { page: 1 };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
};
