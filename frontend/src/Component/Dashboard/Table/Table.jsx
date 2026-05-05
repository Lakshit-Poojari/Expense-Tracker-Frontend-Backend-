import React, { useState } from 'react'
import "../Table/Table.css"

function Table() {

  const [expense, setexpense] = useState()
  const [message, setmessage] = useState("")
  return (
    <>
      <table>
        <thead>
          <tr className='table-heading'>
            <td>Amount</td>
            <td>Type</td>
            <td>Category</td>
            <td>Date</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody className='table-body'>
            <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>0</td>
            <td>9</td>
            <td>8</td>
            <td>7</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Table