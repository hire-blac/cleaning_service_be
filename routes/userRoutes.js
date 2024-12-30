import express from 'express';
import {
  authUser,
  registerUser,
  getUserById,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleLogin
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/google-login', googleLogin); 
router.get('/:id',protect, getUserById);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
