import { application } from "express";
import { application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async (req, res) => {
    try {

        const userId = req.id;
        const { id: jobId } = req.params

        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false
            })
        }

        // check if user has already applied
        const existingApplication = await application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        // check if job exists
        const job = await Job.findById({ jobId });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplication = await application.create({
            job: jobId,
            applicant: userId

        })

        job.applications.push(newApplication._id)

        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })


    } catch (error) {
        console.log(error)
    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: { path: 'company' },
                options: { sort: { createdAt: -1 } }
            });

        if (!application) {
            res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(201).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


const getApplicants = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant' },

        })
        if (!job) {
            res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error)

    }
}


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id: applicationId } = req.params;
        if (!status) {
            res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const application = await application.findOne({ _id: applicationId })
        if (!application) {
            res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated Successfully",
            success: true
        })



    } catch (error) {
        console.log(error)

    }
}