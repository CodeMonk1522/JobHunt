import express from 'express';
import { register, login, updateProfile, logout } from '../controller/user.controller.js';
import auth from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(upload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(auth, updateProfile);

export default router;