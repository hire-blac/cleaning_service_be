import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";


// Register admin
export const registerAdmin = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password, role } = req.body;
  
    // Check if all required fields are provided
    if (!firstName || !lastName || !phoneNumber || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if admin email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }
  
      // Create a new admin
      const admin = await Admin.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        role,
      });
  
      if (admin) {
        generateToken(res, admin._id);
    
        res.status(201).json({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
          homeAddress: admin.homeAddress,
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Login admin
  export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (admin && (await admin.matchPassword(password))) {
      generateToken(res, admin._id); // This sets the token as a cookie
      const adminData = {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
      };
  
      res.json({
        message: 'Admin login successful',
        admin: adminData, 
      });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  };
  
  // Get All Admins
  export const getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find().select('-password');
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  // Get Admin By ID
  export const getAdminById = async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).select('-password'); 
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };

    // Get Admin Profile
  export const getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.user._id); 
  
    if (!admin) {
      res.status(404);
      throw new Error('Admin not found');
    }
  
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  };
  
  // Update Admin
  export const updateAdmin = async (req, res) => {
    try {
      const admin = await Admin.findByIdAndUpdate(
        req.params.id, 
        { ...req.body },
        { new: true, runValidators: true } // Return the updated document
      ).select('-password'); // Exclude password field
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  // Delete Admin
  export const deleteAdmin = async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  