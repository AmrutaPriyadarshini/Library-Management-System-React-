import express from "express";
import { db } from "../db.js";
const router = express.Router();

// Get last student
router.get("/last", (_, res) => {
  db.query("SELECT * FROM Student ORDER BY StudentID DESC LIMIT 1", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
});

// Get first student
router.get("/first", (_, res) => {
  db.query("SELECT * FROM Student ORDER BY StudentID LIMIT 1", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
});

// Get next student
router.get("/next/:id", (req, res) => {
  db.query(
    "SELECT * FROM Student WHERE StudentID > ? ORDER BY StudentID LIMIT 1",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json("End of data");
      res.json(data[0]);
    }
  );
});

// Get previous student
router.get("/prev/:id", (req, res) => {
  db.query(
    "SELECT * FROM Student WHERE StudentID < ? ORDER BY StudentID DESC LIMIT 1",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(404).json("Begin of data");
      res.json(data[0]);
    }
  );
});

// Search
router.get("/search", (req, res) => {
  const { id, regd, branch, name } = req.query;
  let condition = [];

  if (id) condition.push(`StudentID LIKE '%${id}%'`);
  if (regd) condition.push(`RegdNo LIKE '${regd}%'`);
  if (branch) condition.push(`Branch LIKE '${branch}%'`);
  if (name) condition.push(`StudentName LIKE '${name}%'`);

  let sql = "SELECT * FROM Student";
  if (condition.length) sql += " WHERE " + condition.join(" AND ");

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Add student
router.post("/add", (req, res) => {
  db.query(
    "SELECT StudentID FROM Student WHERE RegdNo = ?",
    [req.body.regd],
    (err, duplicate) => {
      if (duplicate.length)
        return res.status(400).json("Regd No already exists!");

      db.query("SELECT MAX(StudentID) AS ID FROM Student", (err, max) => {
        const newId = (max[0].ID || 0) + 1;

        db.query(
          "INSERT INTO Student (StudentID, StudentName, MobileNo, RegdNo, Branch) VALUES (?,?,?,?,?)",
          [newId, req.body.name, req.body.mobile, req.body.regd, req.body.branch],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Record Added", StudentID: newId });
          }
        );
      });
    }
  );
});

// Update student
router.put("/update", (req, res) => {
  db.query(
    "UPDATE Student SET StudentName=?, MobileNo=?, RegdNo=?, Branch=? WHERE StudentID=?",
    [req.body.name, req.body.mobile, req.body.regd, req.body.branch, req.body.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Record Updated");
    }
  );
});

// Delete student
router.delete("/delete/:id", (req, res) => {
  db.query("DELETE FROM Student WHERE StudentID=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json("Record Deleted");
  });
});

export default router;
