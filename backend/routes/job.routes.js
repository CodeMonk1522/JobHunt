import express from 'express';
import auth from '../middleware/auth.js';
import { getAdminJobs, getAllJobs, getJobById, jobPost } from '../controller/job.controller.js';

const router = express.Router();

router.route("/post").post(auth, jobPost),
    router.route("/get").get(auth, getAllJobs),
    router.route("/getadminjobs").get(auth, getAdminJobs),
    router.route("/get/:id").get(auth, getJobById)

export default router;