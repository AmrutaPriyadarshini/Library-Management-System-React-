import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await prisma.books.findMany();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

// GET book by ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.books.findUnique({ where: { BookID: id } });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error fetching book" });
  }
});

// ADD new book
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newBook = await prisma.books.create({
      data: {
        Title: data.Title,
        Author: data.Author,
        ISBN: data.ISBN,
        Publication: data.Publication,
        Subject: data.Subject,
        OriginalStock: data.OriginalStock,
        CurrentStock: data.CurrentStock,
      },
    });
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Error creating book" });
  }
});

// UPDATE book
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await prisma.books.update({
      where: { BookID: id },
      data,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating book" });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await prisma.books.delete({ where: { BookID: id } });
    res.json({ message: "Book deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Error deleting book" });
  }
});

export default router;
