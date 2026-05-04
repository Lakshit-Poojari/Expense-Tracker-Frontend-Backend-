import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "../Register/Register.css"

function Register() {
    const [form, setform] = useState({
        name:"",
        email:"",
        password:""
    })
    const [message, setmessage] = useState("")

    const navigate = useNavigate()

    const API = "http://localhost:3000/api/"

    const handleChange = (e) => {setform({
        ...form,
        [e.target.name] : e.target.value,
    })}

    const handleSubmit =async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post(API + "register", form)
            setmessage(res.data.message)
            console.log(res.data.message);
            navigate("/login")
        } catch (error) {
            console.log(error);
            setmessage(error.message)
        }
    }
  return (
    <div className='container'>
        <div><h2 className='text-center'>Register</h2></div>
        <div className='container register'>
            <form onSubmit={handleSubmit}>

                <label htmlFor="">User name</label><br />
                <input 
                    type="text" 
                    name='name' 
                    value={form.name} 
                    placeholder='Enter user name' 
                    onChange={handleChange} 
                    className='form-control'
                    /><br /><br />

                <label htmlFor="">Email id</label><br />
                <input 
                    type="text" 
                    name='email' 
                    value={form.email} 
                    placeholder='Enter user email' 
                    onChange={handleChange} 
                    className='form-control'
                    /><br /><br />

                <label htmlFor="">Password</label><br />
                <input 
                    type="password" 
                    name='password' 
                    value={form.password} 
                    placeholder='Enter password' 
                    onChange={handleChange} 
                    className='form-control'
                    /><br /><br />

                <button type='submit' className='form-control'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register