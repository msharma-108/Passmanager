import { useEffect, useState } from 'react'
import './App.css'
import {Routes,Route,Navigate} from "react-router-dom"
import Home from './pages/Home'
import Userdata from "./pages/Userdata"
import About from "./pages/About"
import axios from "axios"
function App() {
  const [isloggedin, setisloggedin] = useState(false)
  
  useEffect(() => {
   console.log("rerendering")
  },)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials=true
        const {data} = await axios.get("http://localhost:3000/api/auth/check");
        console.log(data.loggedIn , "hey")
        setisloggedin(data.loggedIn);
      } catch (err) {
        console.error("Error checking auth:", err);
        setisloggedin(false);
      }
    };
    
    checkAuth();
  }, []);
  return (
    <>
      <div> 
        <Routes>
          <Route path='/' element={!isloggedin ? <Home setisloggedin={setisloggedin}/>:<Userdata setisloggedin={setisloggedin}/> }/>
          <Route path='/getuserinfo' element={isloggedin ? <Userdata setisloggedin={setisloggedin}/> :<Navigate to="/" replace/> }/>
          <Route path='/about' element={<About></About>}/>
          <Route path="*" element={isloggedin?<Navigate to="/getuserinfo" replace/>:<Navigate to="/" />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
