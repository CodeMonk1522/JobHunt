import express from 'express';
import auth from '../middleware/auth.js';
import { applyJob } from '../controller/application.controller.js';

const router = express.Router();
router.route("/apply/:id").postget(auth, applyJob);
router.route("/apply/:id").postget(auth, applyJob);

export default router;