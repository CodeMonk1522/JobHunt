import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode)
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }
        req.user = {
            id: decode.userId
          };
        next();
    } catch (error) {

        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export default isAuthenticated