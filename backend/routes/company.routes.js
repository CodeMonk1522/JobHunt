import express from 'express';
import { createCompany, getCompany, getCompanyById, updateCompany } from '../controller/company.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/register").post(auth, createCompany);
router.route("/get/:id").get(auth, getCompanyById);
router.route("/get").get(auth, getCompany);
router.route("/update/:id").put(auth, updateCompany);

export default router;