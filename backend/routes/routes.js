import express from "express"
import { login, register } from "../controller/authController.js"
import { createTransaction, getTranaction, getUserBalance, removeTransaction } from "../controller/transactionController.js"
import { verifyToken } from "../middleware/middleware.js"

const router = express.Router()

// AUTH routes
router.post("/register", register)
router.post("/login", login)

// Transaction route
router.post("/createTransaction", verifyToken, createTransaction)
router.get("/getTransaction", verifyToken, getTranaction)
router.get("/getbalance", verifyToken, getUserBalance)
router.delete("/deleteTransaction", verifyToken, removeTransaction)

export default router