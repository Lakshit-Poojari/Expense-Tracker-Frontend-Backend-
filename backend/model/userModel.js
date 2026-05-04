import db from "../database/db.js";
import mysql from "mysql2/promise"


export const createUser = async(name, email, password) => {
    try {
        const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, password])

        return result
    } catch (error) {
        console.log(error);
    }
}

export const findUser = async(name, email, password) => {
    try {
        const [row] = await db.execute("SELECT * FROM users WHERE email=?", [email])

        return row[0] || null
    } catch (error) {
        console.log(error);       
    }
}