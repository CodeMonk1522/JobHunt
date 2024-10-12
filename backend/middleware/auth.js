import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decode = await verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }

        req.id = decode.userId;
        next();

    } catch (error) {

    }

}

export default auth;