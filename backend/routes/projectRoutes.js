const express = require("express");
const db = require("../config/db");

const router = express.Router();

// CREATE PROJECT
router.post("/", async (req, res) => {
  const {
    title, abstract, department, supervisor,
    year, file_url, video_link, user_id
  } = req.body;

  await db.query(
    `INSERT INTO projects 
    (title, abstract, department, supervisor, year, file_url, video_link, user_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [title, abstract, department, supervisor, year, file_url, video_link, user_id]
  );

  res.json({ msg: "Project submitted" });
});

// GET APPROVED PROJECTS
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM projects WHERE status='approved'");
  res.json(result.rows);
});

// GET SINGLE PROJECT
router.get("/:id", async (req, res) => {
  const result = await db.query("SELECT * FROM projects WHERE id=$1", [req.params.id]);
  res.json(result.rows[0]);
});

module.exports = router;