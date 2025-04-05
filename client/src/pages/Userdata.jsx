
import Navbar from '../components/Navbar'
import Manager from '../components/Manager'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

function userdata({setisloggedin}) {
const navigate=useNavigate()
  const logout=async()=>{
    axios.defaults.withCredentials=true
    const data=await axios.post("http://localhost:3000/logout")
    console.log(data)
    toast.success("Logging you out")
    setisloggedin(false)
    navigate("/")
  }

  return (
    <>
      <div className='min-h-screen bg-blue-200'> 
        <Navbar setisloggedin={setisloggedin}>
        <div onClick={logout} className=' rounded-full transition duration-300 px-2 flex  items-center cursor-pointer h-full hover:bg-neutral-600'>Logout</div>
        </Navbar>
        <Manager setisloggedin={setisloggedin}/>
      </div>
    </>
  )
}

export default userdata
