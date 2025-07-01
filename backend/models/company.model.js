import mongoose, { mongo } from "mongoose";

const CompanySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String

    },
    Website: {
        type: String //URL

    },
    Logo: {
        type: String

    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }






}, { timestamps: true })



export const Company = mongoose.model('Company', CompanySchema)