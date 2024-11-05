import mongoose  from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSchema',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pdf: {
    type: String, // PDF file URL
  },
  images: [{
    type: String // Image URLs
  }],
  textColor: {
    type: String,
    default: '#000000' // Default to black
  },
  isBold: {
    type: Boolean,
    default: false
  },
  useImageList: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const notesModal = mongoose.model("Note", noteSchema)
export default notesModal
