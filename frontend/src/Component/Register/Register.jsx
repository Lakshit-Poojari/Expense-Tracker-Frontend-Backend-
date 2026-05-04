import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setform] = useState({
        name:"",
        email:"",
        passwprd:""
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
        } catch (error) {
            console.log(error);
            setmessage(error.message)
        }
    }
  return (
    <div>
        <div><h2>Register</h2></div>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">User name</label>
                <input type="text" name='' value={} placeholder='Enter user name' onChange={handleChange}/>
                <label htmlFor="">Email id</label>
                <input type="text" name='' value={} placeholder='Enter user email' onChange={handleChange}/>
                <label htmlFor="">Password</label>
                <input type="text" name='' value={} placeholder='Enter password' onChange={handleChange}/>
                <button type='Submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register