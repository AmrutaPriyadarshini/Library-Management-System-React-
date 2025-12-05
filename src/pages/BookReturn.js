// bookReturn.js
const express = require("express");
const router = express.Router();
//const { Pool } = require("pg");

// PostgreSQL connection pool
const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "library",
  password: "your_password",
  port: 5432,
});

// GET: Load last book issue
router.get("/last", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM BookIssued bi
       INNER JOIN Student s ON bi.StudentID = s.StudentID
       INNER JOIN Books b ON bi.BookID = b.BookID
       ORDER BY bi.IssueID DESC
       LIMIT 1`
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Load first book issue
router.get("/first", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM BookIssued bi
       INNER JOIN Student s ON bi.StudentID = s.StudentID
       INNER JOIN Books b ON bi.BookID = b.BookID
       ORDER BY bi.IssueID ASC
       LIMIT 1`
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Load next book issue
router.get("/next/:issueID", async (req, res) => {
  const issueID = req.params.issueID;
  try {
    const result = await pool.query(
      `SELECT *
       FROM BookIssued bi
       INNER JOIN Student s ON bi.StudentID = s.StudentID
       INNER JOIN Books b ON bi.BookID = b.BookID
       WHERE bi.IssueID > $1
       ORDER BY bi.IssueID ASC
       LIMIT 1`,
      [issueID]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Load previous book issue
router.get("/prev/:issueID", async (req, res) => {
  const issueID = req.params.issueID;
  try {
    const result = await pool.query(
      `SELECT *
       FROM BookIssued bi
       INNER JOIN Student s ON bi.StudentID = s.StudentID
       INNER JOIN Books b ON bi.BookID = b.BookID
       WHERE bi.IssueID < $1
       ORDER BY bi.IssueID DESC
       LIMIT 1`,
      [issueID]
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Return a book
router.post("/return", async (req, res) => {
  const { issueID, returnDate } = req.body;
  if (!returnDate) return res.status(400).json({ error: "Return date is missing" });

  try {
    // Get BookID
    const bookResult = await pool.query(
      "SELECT BookID, IssueStatus FROM BookIssued WHERE IssueID = $1",
      [issueID]
    );
    if (bookResult.rows.length === 0) return res.status(404).json({ error: "IssueID not found" });

    const { bookid, issuestatus } = bookResult.rows[0];

    // Update BookIssued
    await pool.query(
      "UPDATE BookIssued SET ReturnDate = $1, IssueStatus = TRUE WHERE IssueID = $2",
      [returnDate, issueID]
    );

    // Update stock only if previously pending
    if (!issuestatus) {
      await pool.query("UPDATE Books SET CurrentStock = CurrentStock + 1 WHERE BookID = $1", [
        bookid,
      ]);
    }

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Delete book return
router.delete("/:issueID", async (req, res) => {
  const issueID = req.params.issueID;
  try {
    const bookResult = await pool.query("SELECT BookID FROM BookIssued WHERE IssueID = $1", [
      issueID,
    ]);
    if (bookResult.rows.length === 0) return res.status(404).json({ error: "IssueID not found" });

    const bookID = bookResult.rows[0].bookid;

    // Reset book issue
    await pool.query("UPDATE BookIssued SET ReturnDate = NULL, IssueStatus = NULL WHERE IssueID = $1", [
      issueID,
    ]);

    // Reduce stock
    await pool.query("UPDATE Books SET CurrentStock = CurrentStock - 1 WHERE BookID = $1", [
      bookID,
    ]);

    res.json({ message: "Book return deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Search books
router.get("/search", async (req, res) => {
  const { bookID, studentID, issueID, issueDate, returnDate } = req.query;
  let conditions = [];
  let values = [];
  let idx = 1;

  if (bookID) {
    conditions.push(`BookID::text LIKE $${idx++}`);
    values.push(`%${bookID}%`);
  }
  if (studentID) {
    conditions.push(`StudentID::text LIKE $${idx++}`);
    values.push(`%${studentID}%`);
  }
  if (issueID) {
    conditions.push(`IssueID::text LIKE $${idx++}`);
    values.push(`%${issueID}%`);
  }
  if (issueDate) {
    conditions.push(`IssueDate::text LIKE $${idx++}`);
    values.push(`${issueDate}%`);
  }
  if (returnDate) {
    conditions.push(`ReturnDate::text LIKE $${idx++}`);
    values.push(`${returnDate}%`);
  }

  let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

  try {
    const result = await pool.query(`SELECT * FROM BookIssued ${whereClause} ORDER BY IssueID DESC`, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
