import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Login/Login.css"
import axios from "axios"

function Login() {
  const [login, setlogin] = useState({
    email:"",
    password:""
  })
  const [message, setmessage] = useState("")

  const navigate = useNavigate()

  const API = "http://localhost:3000/api/"

  const handleChange = (e) =>{
    setlogin({
      ...login,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await axios.post(API + "login", login)

    console.log("LOGIN RESPONSE:", res.data)

    if (!res.data.token) {
      // ❌ login failed
      setmessage(res.data.message)
      return
    }

    // ✅ login success
    localStorage.setItem("token", res.data.token)

    setmessage(res.data.message)

    navigate("/dashboard")

  } catch (error) {
    console.log(error)
    setmessage(error.response?.data?.message || "Login failed")
  }
}


  return (
    <div className='container'>
      <div>
        <h2>Login</h2>
      </div>

      <div className='container register'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">User email</label>
          <input 
            type="text" 
            name='email'
            value={login.email} 
            placeholder='Enter Email' 
            onChange={handleChange}
            required 
            className='form-control'/><br />
            <label htmlFor="">Enter password</label>
          <input 
            type="password" 
            name='password'
            value={login.password} 
            placeholder='Enter password' 
            onChange={handleChange}
            required 
            className='form-control'/><br /><br />
            <button type='submit' className='form-control'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login