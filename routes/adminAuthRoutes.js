import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile} from '../controllers/adminAuthController.js';
import Adminprotect from '../middleware/adminMiddleware.js';


const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', Adminprotect, getAdminProfile);

export default router;
