import { Company } from '../models/company.model.js'

export const createCompany = async (req, res) => {

    try {

        const { companyName } = req.body

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is mandatory",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(400).json({
                message: "Company name already exists",
                success: false
            })

        }

        company = await Company.create({
            companyName,
            userId: req.id

        })


        return res.status(201).json({
            message: "Company registration successful",
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

}


export const getCompany = async (req, res) => {
    try {

        const userId = req.id;
        const companies = await Company.find({userId})
        if (!companies) {
            res.status(404).json({
                message: "Companies not found",
                success: false
            })


        }

        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {

        console.log(error)

    }
}

export const getCompanyById = async (req, res) => {
    try {

        const companyId = req.params.id
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Companynot found",
                success: false
            })

        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file;

        const updateData = {};
        if (companyName) updateData.companyName = companyName;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;


        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
