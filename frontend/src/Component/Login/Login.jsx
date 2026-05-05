import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Login/Login.css"

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

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post(API + "login", login)
      setmessage(res.data.message)
      navigate("/dashboard")

    } catch (error) {
      console.log(error);
      setmessage(error.message)
      
    }
  }


  return (
    <div className='container'>
      <div>
        <h2>Login</h2>
      </div>

      <div className='container register'>
        <form handleSubmit>
          <label htmlFor="">User email</label>
          <input 
            type="text" 
            name='email'
            value={login.email} 
            placeholder='Enter Email' 
            required 
            className='form-control'/><br />
            <label htmlFor="">Enter password</label>
          <input 
            type="password" 
            name='password'
            value={login.password} 
            placeholder='Enter password' 
            required 
            className='form-control'/><br /><br />
            <button type='submit' className='form-control'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login