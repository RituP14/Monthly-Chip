const db = require("./db");

async function getItemList() {
  const data = await db.query("SELECT * from itemList");
  const meta = { page: 1 };

  return {
    data,
    meta,
  };
}
module.exports = {
  getItemList,
};
