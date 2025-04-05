import React from 'react'
import Mypass from './Mypass'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Navbar = ({setisloggedin,children}) => {
  // const navigate=useNavigate()
  // const logout=async()=>{
  //   axios.defaults.withCredentials=true
  //   const data=await axios.post("http://localhost:3000/logout")
  //   console.log(data)
  //   toast.success("Logging you out")
  //   setisloggedin(false)
  //   navigate("/")
  // }

 
  
  return (
    <nav>
        <ul className='bg-black flex select-none justify-around w-full text-white font-bold text-xl h-12'>
            <li className= 'rounded-full transition duration-300 px-2 items-center flex text-yellow-500'>
              <Mypass></Mypass>
            </li>
            <li className='flex h-full gap-4 '>
                <div>{children}</div>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
