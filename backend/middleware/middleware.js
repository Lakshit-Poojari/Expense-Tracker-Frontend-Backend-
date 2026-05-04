import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../controller/authController.js"

export const verifyToken = async(req, res, next) =>{
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.json({message: "Unverified"})
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.json({message: "Access denied"})
        }

        const decoded = jwt.verify(token, "SECRET_KEY")

        req.user = decoded

        next()
    } catch (error) {
        console.log(error);
    }
}