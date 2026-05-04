import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Layout from './Component/Dashboard/Layout/Layout'

function App() {

  const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token")

    return token ? children : <Navigate to="/login"/>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path= "/dashboard" element = {<ProtectedRoute><Layout/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
