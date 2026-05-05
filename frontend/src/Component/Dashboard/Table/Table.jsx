import React, { useEffect, useState } from 'react'
import "../Table/Table.css"
import axios from "axios"

function Table() {

  const [expense, setexpense] = useState([])
  const [message, setmessage] = useState("")

  const API = "http://localhost:3000/api/"

  // FETCH
  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API + "getTransaction", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
      
      setexpense(res.data); // ✅ correct

    } catch (error) {
      setmessage(error.response?.data?.message || "Error fetching data")
    }
  }

  // DELETE
  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(API + `deleteTransaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setmessage(res.data.message);

      fetchTransaction(); // refresh

    } catch (error) {
      setmessage(error.response?.data?.message || "Delete failed")
    }
  }

  useEffect(() => {
    fetchTransaction()
  }, [])

  return (
    <div className='container'>
      <table>
        <thead>
          <tr className='table-heading'>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th> 
          </tr>
        </thead>

        <tbody className='table-body'>
          {expense.map((trans) => (
            <tr key={trans.id}>
              <td>₹ {trans.amount}</td>

              <td style={{ color: trans.type === "Income" ? "green" : "red" }}>
                {trans.type}
              </td>

              <td>{trans.category}</td>

              <td>{new Date(trans.date).toLocaleDateString("en-IN")}</td>

              <td>{trans.description}</td>

              <td>
                <button 
                  onClick={() => deleteTransaction(trans.id)}
                  className='delete-btn'
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table