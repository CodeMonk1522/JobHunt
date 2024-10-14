import { Job } from '../models/job.model.js';

export const jobPost = async (req, res) => {
    try {

        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        console.log(title, description, requirements, salary, location, jobType, experience, position, companyId)
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            })

        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            createdBy: userId


        })

        return res.status(201).json({
            message: 'New Job Posting Created Successfully',
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs = async (req, res) => {
    try {

        const keywords = req.query.keywords || "";
        const query = {
            $or: [
                { title: { $regex: keywords, $options: "i" } },
                { description: { $regex: keywords, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path : "company"
        }).sort({createdAt:-1})
        if (!jobs) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })


        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
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

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId })
        if (!jobs) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error)

    }
}