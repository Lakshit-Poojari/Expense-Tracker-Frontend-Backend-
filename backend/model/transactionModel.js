import db from "../database/db.js";
import mysql from "mysql2/promise"

export const addTransaction = async(user_id, amount, type, category, description, date) =>{
    try {
        const [result] = await db.execute(
            "INSERT INTO transaction (user_id, amount, type, category, description, date) VALUES(?, ?, ?, ?, ?, ?)", 
            [user_id, amount, type, category, description, date])
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

export const getBalance = async (user_id) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT 
        COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) AS income,
        COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
      FROM transaction
      WHERE user_id = ?
      `,
      [user_id]
    );

    console.log("ROWS:", rows); // 🔥 debug

    return rows?.[0] || { income: 0, expense: 0 };

  } catch (error) {
    console.log(error);
  }
};