import express from "express";
import { addNotes, deleteNotes, getNotes, modifyNotes } from "../controllers/notesController.js";
// const auth = require('../middleware/auth.js'); 
const router = express.Router();

router.post("/addNotes", addNotes);
router.get("/getNotes", getNotes);
router.delete("/deleteNotes", deleteNotes);
router.put("/modifyNotes", modifyNotes);

export default router;



