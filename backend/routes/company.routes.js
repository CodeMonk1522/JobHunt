import express from 'express';
import mongoose from 'mongoose';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/auth.js';
import { createCompany, getCompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';
const router = express.Router()


router.route("/register/company").post(createCompany)
router.route("/getCompany").post(getCompany)
router.route("/getCompany/:id").get(getCompanyById)
router.route("/update/company").post(isAuthenticated, updateCompany)

export default router