import { Company } from "../models/company.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//createCompany
//GetcCompany
//GetCompanyById
//Update Company 


export const createCompany = async (req, res) => {
    //take input
    //check if company exists
    //if not take data add in db - add userId from req.id
    try {
        const { Name } = req.body
        if (!Name) {
            return res.status(400).json({
                message: "Please fill all required fields",
                success: false
            })
        }

        let company = await Company.findOne({ name: Name }) //why?
        if (company) {
            return res.status(400).json({
                message: "Company already exists wit this name!",
                success: false
            })
        }

        await Company.create({
            Name,
            UserId: req.id
        })
        return res.status(201).json({
            message: "Company Creation Successful",
            success: true
        })

    } catch (error) {
        console.log(`Error from createCompany(): ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.user.id
        const companies = await Company.findby({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(`Error from getCompany(): ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}



export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findby({ companyId })
        if (!company) {
            return res.status(404).json({
                message: "company not found.",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(`Error from getCompanyById(): ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


export const updateCompany = async (req, res) => {
    try {
        const { Name, Description, Website, Location, Logo } = req.body
        const file = req.file

        //cloudinary gies here

        const updateData = { Name, Description, Website, Logo }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })



    } catch (error) {
        console.log(`Error from updateCompany(): ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}