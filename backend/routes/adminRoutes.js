const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.put("/approve/:id", async (req, res) => {
  await db.query("UPDATE projects SET status='approved' WHERE id=$1", [req.params.id]);
  res.json({ msg: "Approved" });
});

router.put("/reject/:id", async (req, res) => {
  await db.query("UPDATE projects SET status='rejected' WHERE id=$1", [req.params.id]);
  res.json({ msg: "Rejected" });
});

module.exports = router;