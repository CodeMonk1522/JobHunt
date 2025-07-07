


// functions needed register, login, logout, updateProfile

import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const register = async (req, res) => {
    //1.check if all feilds are filled if not send 400
    //2. take email and check if it exists
    //3.take all the data and pus it to

    try {
        const { Name, Email, Phone, Password, Role } = req.body;
        if (!Name || !Email || !Phone || !Password || !Role) {
            return res.status(400).json({
                message: "Please fill all required fields",
                success: false
            })
        }

        const user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({
                message: "User already exists wit this email!",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        await User.create({
            Name,
            Email,
            Phone,
            Password: hashedPassword,
            Role
        })
        return res.status(201).json({
            message: "Account Creation Successful",
            success: true
        })
    } catch (error) {
        console.log(`Error from register func: ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }
}

export const login = async (req, res) => {
    //1. take inputs and check if any missing
    //2. check if the user exists - check email password and role
    //3. if exists then do jwt and authenticate
    try {
        const { Email, Password, Role } = req.body;
        if (!Email || !Password || !Role) {
            return res.status(400).json({
                message: "Please fill all required fields",
                success: false
            })
        }
        let user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email",
                success: false
            });
        }
        const isPasswordmatch = await bcrypt.compare(Password, user.Password);
        if (!isPasswordmatch)
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });

        if (Role !== user.Role) {
            return res.status(400).json({
                message: "User does not exist with this role",
                success: false
            });
        }

        //if everything checks out generate jwt and store in cookies
        const tokenData = {
            userId: user._id // user._id comes from mongo
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

        user = {
            _id: user._id,
            name: user.Name,
            email: user.Email,
            phone: user.Phone,
            profile: user.Profile,
            role: user.Role

        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.Name}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(`Error from login func: ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }



}

export const logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: " Logout Successfully",
            success: true
        })

    } catch (error) {
        console.log(`Error from logout func: ${error}`)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }

}


export const updateProfile = async (req, res) => {
    try {
        const { Name, Email, Phone, Bio, Skills } = req.body;

        // Cloudinary file can go here if needed
        // const file = req.body.file; // only if you're using file uploads

        // Parse skills string to array (if it exists)
        let skillsArr = [];
        if (Skills) {
            skillsArr = Skills.split(',').map(skill => skill.trim());
        }

        // userId should come from middleware like isAuthenticated
        const userId = req.user?.id; // use req.user.id instead of user.id
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized – User ID not found in request",
                success: false
            });
        }

        // Fetch user from DB
        const user = await User.findById(userId); // ✅ Correct usage
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update fields if provided
        if (Name) user.Name = Name;
        if (Email) user.Email = Email;
        if (Phone) user.Phone = Phone;
        if (Bio) user.Profile.Bio = Bio;
        if (Skills) user.Profile.Skills = skillsArr;

        // Save updated user
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.error(`Error from updateProfile:`, error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};
