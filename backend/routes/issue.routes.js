// routes/issue.routes.js
//import express from "express";
import { issueBook } from "../controllers/issue.controller.js";
const router = express.Router();

router.post("/new", issueBook);

export default router;
