import mongoose from "mongoose";

// user inputs -> Name, Email, PhoneNumber, Password, Role, Profile
const UserSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true
    },

    Phone: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        enum: ['student', 'recruiter']
    },

    Profile: {
        Bio: { type: String },
        Skills: [{ type: String }],
        Resume: [{ type: String }], //URL of Resume
        ResumeoriginalName: { type: String },
        Company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }], // Establishing a relation between Company Table and User Table
        Profilepicture: {
            type: String,
            default: ""
        }
    }

}, { timestamp: true });

export const User = mongoose.model('User', UserSchema)