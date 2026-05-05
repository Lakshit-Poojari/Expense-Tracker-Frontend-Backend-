import React, { useEffect, useState } from 'react'
import axios from "axios"

function Balance({ expense }) {

  const income = expense
    .filter(e => e.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const expenseTotal = expense
    .filter(e => e.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const balance = income - expenseTotal

  return (
    <div>
      <h3 style={{ color: "green" }}>Income: ₹ {income}</h3>
      <h3 style={{ color: "red" }}>Expense: ₹ {expenseTotal}</h3>
      <h2>Balance: ₹ {balance}</h2>
    </div>
  )
}

export default Balance