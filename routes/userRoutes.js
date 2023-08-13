import express from 'express';
const router = express.Router();
import { registerUser, loginUser, userProfile, updateProfile } from '../controllers/userControllers';
import { authGuard } from '../middleware/authMiddleware';



//api endpoint
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);

export default router;