import db from "../database/db.js";
import mysql from "mysql2/promise"


// CREATE USER
export const createUser = async (name, email, password) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// FIND USER (returns ARRAY)
export const findUser = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows; // ✅ ALWAYS return array
  } catch (error) {
    console.log(error);
  }
};