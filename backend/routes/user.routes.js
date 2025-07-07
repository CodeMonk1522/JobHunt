import express from 'express';
import mongoose from 'mongoose';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/auth.js';
const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/update/profile").post(isAuthenticated, updateProfile)

export default router