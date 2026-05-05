import React, { useEffect, useState } from 'react'
import axios from "axios"

function Balance() {
  const [balance, setbalance] = useState(0)
  const [message, setmessage] = useState("")

  const API = "http://localhost:3000/api/"

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(API + "getbalance", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("BALANCE DATA:", res.data)

      const income = res.data.income || 0
      const expense = res.data.expense || 0

      setbalance(income - expense)

    } catch (error) {
      setmessage(error.response?.data?.message || "Error fetching balance")
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  return (
    <div>
      <h3>
        Balance: 
        <span style={{ color: balance >= 0 ? "green" : "red" }}>
          ₹ {balance}
        </span>
      </h3>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Balance