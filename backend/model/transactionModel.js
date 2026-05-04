import db from "../database/db";

export const addTransaction = async(user_id, amount, type, category, description) =>{
    try {
        const [result] = await db.execute(
            "INSERT INTO transaction (user_id, amount, type, category, description) VALUES(?, ?, ?, ?, ?)", 
            [user_id, amount, type, category, description])
        return result
    } catch (error) {
        console.log(error);
        
    }
}

export const getTransaction = async(user_id) => {
    try {
        const [rows] = await db.execute("SELECT * FROM transaction WHERE user_id = ?", [user_id])
        return rows 
    } catch (error) {
        console.log(error);
    }
}

export const deleteTransacion = async(id, user_id) => {
    try {
        const [result] = await db.execute("DELETE FROM transaction WHERE id=? AND user_id = ?", [id, user_id])
        return result
    } catch (error) {
        console.log(error); 
    }
}

export const getBalance = async(user_id) =>{
    try {
        const [row] = await db.execute(`SELECT 
            SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
            FROM transactions WHERE user_id=?`, [user_id]
        )

     return row[0] || null
    } catch (error) {
        console.log(error);
    }
}