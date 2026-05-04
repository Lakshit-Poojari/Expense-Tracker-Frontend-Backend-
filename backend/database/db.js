import mysql from "mysql/promise"

export const db = mysql.createpool({
    host:'localhost',
    user:'root',
    password:"",
    database: "expensetracker_db"
})

export default db