// controllers/issue.controller.js
import { prisma } from "../prisma.js";

export const issueBook = async (req, res) => {
  try {
    const { StudentID, BookID, IssueDate } = req.body;

    // check student
    const student = await prisma.student.findUnique({ where: { StudentID } });
    if (!student) return res.status(400).json({ message: "Invalid Student ID" });

    // check book
    const book = await prisma.books.findUnique({ where: { BookID } });
    if (!book) return res.status(400).json({ message: "Invalid Book ID" });
    if (book.CurrentStock <= 0) return res.status(400).json({ message: "Out of stock" });

    // decrease stock & insert issue transaction
    const issue = await prisma.bookIssued.create({
      data: {
        StudentID,
        BookID,
        IssueDate: new Date(IssueDate),
      },
    });

    await prisma.books.update({
      where: { BookID },
      data: { CurrentStock: book.CurrentStock - 1 }
    });

    res.json({ message: "Book Issued Successfully", issue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
