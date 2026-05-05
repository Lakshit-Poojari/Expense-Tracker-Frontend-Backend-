import React, { useState } from 'react'
import Table from '../Table/Table'

function Layout() {
  const [expense, setexpense] = useState({

  })

  return (
    <>
        <div>
          <h3>Expense Tracker</h3>
        </div>

        <div className='expense-input'>
          <form >

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              
              
            />

            <select
              name="type"
              
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="text"
              name="category"
              placeholder="Category (Food, Travel...)"
              
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              
            />

            <input type="date" />

            <button type="submit">Add</button>

          </form>
        </div>
        <Table/>
    </>
  )
}

export default Layout