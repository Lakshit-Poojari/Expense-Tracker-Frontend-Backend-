import React, { useEffect, useState } from 'react'
import "../Table/Table.css"
import axios from "axios"

function Table({ expense, fetchTransaction }) {

  const API = "http://localhost:3000/api/"

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token")

      await axios.delete(API + `deleteTransaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      fetchTransaction() // ✅ refresh

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
          <th>Date</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expense?.map((t) => (
          <tr key={t.id}>
            <td>₹ {t.amount}</td>

            <td style={{ color: t.type === "Income" ? "green" : "red" }}>
              {t.type}
            </td>

            <td>{t.category}</td>
            <td>{t.date
                ? new Date(t.date).toLocaleDateString("en-IN")
                : "No date"}</td>
            <td>{t.description}</td>

            <td>
              <button className='form-control' onClick={() => deleteTransaction(t.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table