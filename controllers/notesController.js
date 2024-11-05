import notesModal from "../modals/notesModal.js";

export const addNotes = async (req, res) => {
    const { title, content, pdf, images, textColor, isBold, useImageList } = req.body;

    try {
        const note = new notesModal({
            userId: req.user._id ,
            title,
            content,
            pdf,
            images,
            textColor,
            isBold,
            useImageList
        });

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
        // Handle any errors that occur
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}

export const deleteNotes = async (req, res) => { }

export const modifyNotes = async (req, res) => { }