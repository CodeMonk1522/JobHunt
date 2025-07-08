import mongoose, { mongo } from "mongoose";

const JobSchema = mongoose.Schema({

    Title: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    Requirements: [{
        type: String,
        required: true
    }],


    Salary: {
        type: Number,
        required: true
    },

    Location: {
        type: String,
        required: true
    },

    Jobtype: {
        type: String,
        required: true
    },
    Position: {
        type: Number,
        required: true
    },
    
    Experience: {
        type: String,
        required: true
    },


    Company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    Createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',

    }]

}, { timestamps: true })

export const Job = mongoose.model('Job', JobSchema)