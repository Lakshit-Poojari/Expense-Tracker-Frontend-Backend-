import React, { useState } from 'react'
import axios from "axios"

function Balance() {
    const [balance, setbalance] = useState()
    const [message, setmessage] = useState("")

    const API = "http://localhost:3000/api/"

    const fetchBalance = async() => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(API + "getbalance", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setbalance(res.data)
            console.log(res.data);
            setmessage(res.data.message)
        } catch (error) {
            setmessage(error.message)
        }
    }

  return (
    <div>Balance: {balance}</div>
  )
}

export default Balance