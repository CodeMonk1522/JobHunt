import express from 'express';
import auth from '../middleware/auth.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controller/application.controller.js';

const router = express.Router();
router.route("/apply/:id").get(auth, applyJob);
router.route("/get").get(auth, getAppliedJobs);
router.route("/:id/applicants").get(auth, getApplicants)
router.route("/status/:id/update").post(auth, updateStatus)

export default router;