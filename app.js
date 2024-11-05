import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/notesRouter.js";
import dotenv from 'dotenv';

const PORT =process.env.PORT || 4000;
const app = express();

dotenv.config();
const uri = process.env.MONGOURL


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(error => console.error('Connection error', error));

app.use(cors());
app.use(express.json());
app.use( "/api/users", userRouter);
app.use( "/api/users/notes", notesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});