import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
export const register = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the required field",
                success: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPwd,
            role

        })

        return res.status(200).json({
            message: "Account creation successful",
            success: true
        })

    } catch (error) {
        console.log(`Error ${error}`)
        return res.status(400).json({
            message: `Opps something went wrong`,
            success: false
        })

    }


}



export const login = async (req, res) => {

    try {

        const { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the required field",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email",
                success: false
            })
        }

        const isPwdMatch = await bcrypt.compare(password, user.password)
        if (!isPwdMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })

        }

        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        const token = await sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });


        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Login Successful, Welcome back ${user.fullname}`,
            user,
            success: true
        })




    } catch (error) {
        console.log(`Error ${error}`);
        return res.status(400).json({
            message: `Opps something went wrong`,
            success: false
        })
    }

}



export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' })  
            .json({
                message: "Logout Successful",
                success: true
            });

    } catch (error) {
        console.log(`Error ${error}`);
        return res.status(400).json({
            message: `Oops, something went wrong`,
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const resumeFile = req.file

        let skillsArr;
        if (skills) {
            skillsArr = skills.split(",");
        }

        const userId = req.id; //middleware auth

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        //updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArr


        //update resume code

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        return res.status(200).json({
            message: `Profile Updated successfully`,
            user,
            success: true
        })


    } catch (error) {

        console.log(`Error ${error}`);
        return res.status(400).json({
            message: `Opps something went wrong`,
            success: false
        })
    }
}