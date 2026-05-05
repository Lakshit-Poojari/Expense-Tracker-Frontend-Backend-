import { addTransaction, deleteTransacion, getBalance, getTransaction } from "../model/transactionModel.js";

export const createTransaction = async(req, res) =>{
    try {
        const user_id = req.user.id;
        let {amount, type, category, description, date } = req.body

        date = date || new Date().toISOString().split("T")[0];

        amount = Number(amount)
        if (isNaN(amount) || amount <= 0) {
            return res.json({message : "Amount Shound be Positive or greater than 0"})
        }

        if (!amount || !type || ! category) {
            return res.json({message: "Missing field"})
        }

        if (!["income", "expense"].includes(type)) {
            return res.json({message : "Invalid Type"})
        }

        await addTransaction(user_id, amount, type, category, description, date )

        return res.json({messge : "Transaction added"})
    } catch (error) {
        console.log(error);
        return res.json({message : "server error"})
    }
}

export const getTranaction = async(req, res) =>{
    try {
        const user_id = req.user.id

        const data = await getTransaction(user_id)

        return res.json(data)
    } catch (error) {
        console.log(error);
        return res.json({message : "server error"})
    }
}

export const removeTransaction = async(req, res) => {
    try {
        const user_id = req.user.id;
        const {id} = req.params;

        await deleteTransacion(id, user_id)

        return res.json({message : "Transaction deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.json({message: "Server error"})
    }
}

export const getUserBalance = async (req, res) => {
  try {
    // ✅ safe access
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ call model (NOT itself)
    const balance = await getBalance(user_id);
    console.log("BALANCE FROM DB:", balance);

    return res.json(balance);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};