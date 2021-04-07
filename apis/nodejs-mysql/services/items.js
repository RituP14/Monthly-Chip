//const { delete } = require("../app");
const db = require("./db");
const { getItemList } = require("./itemList");

async function getMultiple() {
  const data = await db.query("SELECT itemName from items");
  const meta = { page: 1 };

  return {
    data,
    meta,
  };
}

function validateCreate(itemList) {
  let messages = [];
  console.log(itemList);

  if (!itemList) {
    messages.push("No object is provided");
  }
  if (!itemList.item_name) {
    messages.push("Quote is empty");
  }
  if (!itemList.item_amount) {
    messages.push("Quote is empty");
  }

  if (!itemList.description) {
    messages.push("Quote is empty");
  }
  if (!itemList.date) {
    messages.push("Quote is empty");
  }
  if (itemList.item_name && itemList.item_name.length > 255) {
    messages.push("Quote cannot be longer than 255 characters");
  }

  if (itemList.description && itemList.description.length > 255) {
    messages.push("Author name cannot be longer than 255 characters");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}
async function create(itemList) {
  validateCreate(itemList);

  const result = await db.query(
    "INSERT INTO itemList(item_name,item_amount,description,date) VALUES(?,?,?,?)",
    [
      itemList.item_name,
      itemList.item_amount,
      itemList.description,
      itemList.date,
    ]
  );
  let message = "Error in creating item";

  if (result.affectedRows) {
    message = "Items created successfully";
  }

  return { message };
}

// async function deleteItem(item) {
//   var deleteItem = itemList["item" + req.params.item_id];
//   delete itemList["item" + req.params.item_id];
//   console.log(
//     "After deletion item list :\n" + JSON.stringify(getItemList, null, 4)
//   );
//   res.end("After deletion item list :\n" + JSON.stringify(deleteItem, null, 4));
// }

// exports.delete = function (req, res) {
//   var deleteItem = itemList["item" + req.params.item_id];
//   delete itemList["item" + req.params.item_id];
//   console.log(
//     "After deletion item list :\n" + JSON.stringify(getItemList, null, 4)
//   );
//   res.end("After deletion item list :\n" + JSON.stringify(deleteItem, null, 4));
// };

module.exports = {
  getMultiple,
  create,
  //deleteItem,
};
