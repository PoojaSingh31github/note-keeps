import notesModal from "../modals/notesModal.js";
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return cb(new Error('Only PDFs and image files are allowed'), false);
      }
      cb(null, true);
    }
  });
  

export const addNotes = async (req, res) => {
    const {userId, title, content, textColor, isBold, useImageList } = req.body;
    console.log( title, content, pdf, images, textColor, isBold, useImageList, "dfghjk")
    const files = req.files;
    try {
        const note = new notesModal({
            userId ,
            title,
            content,
            pdf : files.pdf ? files.pdf[0].path : null,
            images : files.images ? files.images.map(file => file.path) : [],
            textColor,
            isBold,
            useImageList
        });
        console.log(note)

        await note.save();
        res.status(201).json({ message: 'Note added successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Error adding note', error });
    }
}

export const getNotes = async (req, res) => {
    const {userId} = req.body
    try {
        const notes = await notesModal.find({_id: userId});
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}

export const deleteNotes = async (req, res) => {
    const { noteId } = req.body; 

    try {
        const deletedNote = await notesModal.findOneAndDelete({ _id: noteId, userId: req.user._id });
        
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found or you do not have permission to delete this note." });
        }
        
        res.status(200).json({ message: "Note deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
}

export const modifyNotes = async (req, res) => {
    const { noteId, title, content, pdf, images, textColor, isBold, useImageList } = req.body;

    try {
        const updatedNote = await notesModal.findOneAndUpdate(
            { _id: noteId, userId: req.user._id }, 
            { title, content, pdf, images, textColor, isBold, useImageList },
            { new: true } 
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found or you do not have permission to modify this note." });
        }
        
        res.status(200).json({ message: "Note updated successfully.", updatedNote });
    } catch (error) {
        res.status(500).json({ message: 'Error modifying note', error });
    }
}
