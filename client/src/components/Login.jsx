import {useState,useRef, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
const Login = (props) => {
    const [loginstate, setloginstate] = useState("Signup")
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const navigate=useNavigate()
    
    const submithandler=async(e)=>{
        try{
            e.preventDefault()
            axios.defaults.withCredentials=true
            if(loginstate==="Signup"){
                const {data}=await axios.post("http://localhost:3000/register",{name:username.current.value,email:email.current.value,password:password.current.value})
                if (data.success){
                setloginstate("Login")               
                toast.success('User registered successfully!')
                username.current.value=""
                email.current.value=""
                password.current.value=""
                console.log(data)}
                else{
                    toast.error(data.message)
                }
            }
            else if(loginstate==="Login"){
                const {data}=await axios.post("http://localhost:3000/login",{email:email.current.value,password:password.current.value})
                console.log(data)
                if(data.success){
                    props.setisloggedin(true)
                    toast.success("Logging you in")
                    navigate("/getuserinfo")
                }
                else {
                    toast.error(data.message)
                }
            }
        }catch(error){
            console.log(error.message)
        }
    }



    useEffect(() => {       
        email.current.value=""
        password.current.value=""    
    }, [loginstate])
    

  return (
    
    <div className='border-1 h-fit mt-10 w-1/2 m-auto flex flex-col items-center bg-slate-800 gap-3 rounded-xl'>
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
        <div className='text-3xl font-bold'>SignUp or Register !</div>
       <p className='text-blue-700 font-semibold'>{loginstate==="Signup"?"Create":"Login to"} your account</p>
        <form onSubmit={submithandler} className='flex flex-col w-9/10 gap-3'>
            {loginstate==="Signup" && <input ref={username} required className="w-full bg-slate-500 rounded-full px-2" type="text" placeholder='Enter your username' name='username'/>}
            <input ref={email} required className="w-full bg-slate-500 rounded-full px-2" type="email" placeholder='Enter email ID' name='email '/>
            <input ref={password} required className="w-full bg-slate-500 rounded-full px-2" type="password" placeholder='Enter password' name='password'/>
            <input type="submit" value={loginstate==="Login"?"Login":"Signup"} className='w-1/3 rounded-full py-2 font-bold bg-blue-800 hover:bg-blue-500 cursor-pointer transition transition-400'/>
        </form>
        
        {loginstate==="Signup" && <p className="font-semibold text-white">Already have an account? <span onClick={()=>setloginstate("Login")} className='underline text-blue-500 cursor-pointer'>LogIn</span></p>}
        {loginstate==="Login" && <p className="font-semibold text-white">Dont have an account? <span onClick={()=>setloginstate("Signup")} className='underline text-blue-500 cursor-pointer'>SignUp</span></p>}
    </div>
  )
}

export default Login
