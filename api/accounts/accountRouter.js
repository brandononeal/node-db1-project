const express = require("express");
const router = express.Router();
const Account = require("./accountModel");

// Endpoints

router.get("/", async (req, res) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", validateAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Account.getById(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", validateAccount, async (req, res) => {
  try {
    const account = req.body;
    const data = await Account.create(account);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", [validateAccountId, validateAccount], async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await Account.update(id, changes);
    const updated = await Account.getById(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", validateAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    await Account.delete(id);
    res.json({ message: `Account ${id} successfully removed` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware

function validateAccountId(req, res, next) {
  Account.getById(req.params.id).then((account) => {
    if (!account) {
      res.status(404).json({ message: "Invalid account id" });
    } else {
      next();
    }
  });
}

function validateAccount(req, res, next) {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "Please provide name and budget" });
  } else {
    next();
  }
}

module.exports = router;
