import express from 'express';
const router = express.Router();
import { authGuard, adminGuard } from '../middleware/authMiddleware';
import {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
} from '../controllers/postControllers';


//api endpoint
router.post("/", authGuard, adminGuard, createPost);
router.get("/", getAllPosts);
router.put("/:slug", authGuard, adminGuard, updatePost);
router.delete("/:slug", authGuard, adminGuard, deletePost);
router.get("/:slug", getPost);


export default router;