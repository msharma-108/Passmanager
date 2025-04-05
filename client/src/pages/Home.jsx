import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import { useNavigate } from 'react-router-dom'
const Home = ({setisloggedin}) => {
  const navigate=useNavigate()
  return (
    <>
      <Navbar>
      <div onClick={()=>navigate("/about")} className=' rounded-full transition duration-300 px-2 flex  items-center cursor-pointer h-full hover:bg-neutral-600'>About</div>
      </Navbar>   
      <Login  setisloggedin={setisloggedin}></Login>      
    </>
  )
}

export default Home
