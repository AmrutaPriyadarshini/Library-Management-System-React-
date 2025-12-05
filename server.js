import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import studentRoutes from "./routes/student.js";
import booksRouter from "./routes/books.js";

const app = express();
const prisma = new PrismaClient(); // make sure you generated client

app.use(cors());
app.use(express.json());
app.use("/student", studentRoutes);
app.use("/api/books", booksRouter);



app.listen(3000, () => console.log("Server running on http://localhost:3000"));
