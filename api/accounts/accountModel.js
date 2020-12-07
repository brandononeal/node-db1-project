const db = require("../../data/dbConfig");

module.exports = {
  getAll() {
    return db("accounts");
  },
  getById(id) {
    return db("accounts").where("id", id).first();
  },
  create(account) {
    return db("accounts")
      .insert(account)
      .then(([id]) => {
        return db("accounts").where("id", id).first();
      });
  },
  update(id, changes) {
    return db("accounts").where("id", id).update(changes);
  },
  delete(id) {
    return db("accounts").where("id", id).del();
  },
};
