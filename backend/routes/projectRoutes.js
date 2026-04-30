const express = require("express");
const db = require("../config/db");

const router = express.Router();

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const {
      title, abstract, department, supervisor,
      year, file_url, video_link, user_id
    } = req.body;

    // SIMPLE VALIDATION
    if (!title || !abstract || !department || !year) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    await db.query(
      `INSERT INTO projects 
      (title, abstract, department, supervisor, year, file_url, video_link, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [title, abstract, department, supervisor, year, file_url, video_link, user_id]
    );

    res.json({ message: "Project submitted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET APPROVED PROJECTS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM projects WHERE status='approved'"
    );
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET SINGLE PROJECT
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM projects WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;