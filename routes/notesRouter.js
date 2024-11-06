import express from "express";
import { addNotes, deleteNotes, getNotes, modifyNotes } from "../controllers/notesController.js";
// import auth from "../middleware/auth.js"
const router = express.Router();

router.post("/addNotes",upload.fields([
    { name: 'pdf', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), addNotes);
router.get("/getNotes", getNotes);
router.delete("/deleteNotes", deleteNotes);
router.put("/modifyNotes", modifyNotes);

export default router;



