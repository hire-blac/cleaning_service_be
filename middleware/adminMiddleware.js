import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

// Middleware to protect routes and ensure the user is an admin
export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

      req.admin = await Admin.findById(decoded.id).select("-password"); // Attach admin data to request
      next(); // Proceed to next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
