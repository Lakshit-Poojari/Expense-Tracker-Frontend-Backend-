import React, { useState } from 'react'
import Table from '../Table/Table'
import axios from "axios"
import Balance from '../Balance/Balance';

function Layout() {
  const [expense, setExpense] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    date: ""
  });
  const [message, setmessage] = useState("")

  const API = "http://localhost:3000/api/"

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setmessage("Please login again");
      return;
    }

    const res = await axios.post(
      API + "createTransaction",
      expense,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setmessage(res.data.message);

    // reset form
    setExpense({
      amount: "",
      type: "",
      category: "",
      description: "",
      date: ""
    });

  } catch (error) {
    setmessage(error.response?.data?.message || "Error occurred");
  }
};

  return (
    <>
      <div>
        <h3>Expense Tracker</h3>
      </div>


      <div className='expense-input'>
        <form onSubmit={handleSubmit}>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={handleChange}
            className='form-control'
          /> <br />

          <select
            name="type"
            value={expense.type}
            onChange={handleChange}
            className='form-control'
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select><br />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={expense.category}
            onChange={handleChange}
            className='form-control'
          /><br />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={expense.description}
            onChange={handleChange}
            className='form-control'
          /><br />

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className='form-control'
          /><br />

          <button className='form-control' type="submit">Add</button><br />

        </form>
       
      </div>

      <Table />
      <Balance/>
    </>
  )
}

export default Layout