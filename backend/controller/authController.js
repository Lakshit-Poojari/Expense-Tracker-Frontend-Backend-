import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { createUser, findUser } from "../model/userModel"

export const SECRET_KEY = "EXPENCE_TRACK"

export const register = async(req, res) =>{
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.json({message : "All field required"})
        }

        const userExist = await findUser(email)

        if (userExist) {
            return res.json({message: "User Exist Please Login"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await createUser(name, email, hashedPassword)

        return res.json({message : "User registered successfully"})
    } catch (error) {
        console.log(error);
        return res.json({message : "Something went wrong"})
    }
}

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body

        const user = await findUser(email)

        if (!user) {
            return res.json({message : "User does not exist please registor"})
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.json({message : "Invalid credential"})
        }

        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: "1h"})

        return res.json({token})
    } catch (error) {
        console.log(error);
        return res.json({message : "Something went wrong"})
    }
}