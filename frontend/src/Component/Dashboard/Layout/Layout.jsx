import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import axios from "axios"
import Balance from '../Balance/Balance';

function Layout() {

  const [expense, setExpense] = useState([])
  const [form, setForm] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    date: ""
  })

  const [message, setMessage] = useState("")

  const API = "http://localhost:3000/api/"

  // 🔥 FETCH TRANSACTIONS
  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(API + "getTransaction", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setExpense(res.data)

    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching data")
    }
  }

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 🔥 ADD TRANSACTION
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(
        API + "createTransaction",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setMessage(res.data.message)

      // reset form
      setForm({
        amount: "",
        type: "",
        category: "",
        description: "",
        date: ""
      })

      fetchTransaction() // ✅ refresh

    } catch (error) {
      setMessage(error.response?.data?.message || "Error")
    }
  }

  useEffect(() => {
    fetchTransaction()
  }, [])

  return (
    <>
      <h2>Expense Tracker</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className='form-control'
        /><br />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className='form-control'
        >
          <option value="">Select</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select><br />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className='form-control'
        /><br />

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className='form-control'
        /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className='form-control'
        /> <br />

        <button className='form-control' type="submit">Add</button>
      </form>

      <p>{message}</p>

      {/* TABLE */}
      <Table
        expense={expense}
        fetchTransaction={fetchTransaction}
      />

      {/* BALANCE */}
      <Balance expense={expense} />

    </>
  )
}

export default Layout