import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
    Job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    Applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
})

export const Application = mongoose.model('Application', ApplicationSchema)


