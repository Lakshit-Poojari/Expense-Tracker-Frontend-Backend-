import React, { useEffect, useState } from 'react'
import "../Table/Table.css"
import axios from "axios"

function Table() {

  const [expense, setexpense] = useState([])
  const [message, setmessage] = useState("")

  const API = "http://localhost:3000/api/"

  const fetchTransaction = async(e) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API + "getTransaction", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      console.log(res.data);
      setmessage(res.data.message)
    } catch (error) {
      setmessage(error.message)
    }
  }

  const deleteTransaction = async(id) =>{
    try {

      const token = localStorage.getItem("token");
      const res = await axios.delete(API + `deleteTransaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      
      setmessage(res.data.message)
      fetchTransaction()
    } catch (error) {
      setmessage(error.message)
    }
  }

  useEffect(() => {
    fetchTransaction()
  }, [])
  
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