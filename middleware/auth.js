import jwt from "jsonwebtoken";
import userModal from "../modals/userModal.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const token = authorization.replace("Bearer", "").trim();

  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;
    const dbUser = await userModal.findById(_id);
    
    if (!dbUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Corrected variable name to `dbUser`
    req.user = dbUser;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);  // Log the error
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export default authenticate;
