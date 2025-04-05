import {useRef,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Mypass from './Mypass'
import Details from './Details'
import Welcome from './Welcome';
import axios from "axios"
const Manager = () => {
    const icon = useRef(null)
    const [display, setdisplay] = useState("password")
    const [displayname, setdisplayname] = useState()
    const password = useRef()
    const username = useRef()
    const url = useRef()
    const [form, setform] = useState([])
    const navigate=useNavigate()
  
        const getalldata=async ()=>{
            axios.defaults.withCredentials=true
            const {data}=await axios.get("http://localhost:3000/getuserinfo")
            if(data.success){
                console.log(data)
                setdisplayname(data.displayuserdata.name)
                setform(data.displayuserdata.data)
            }
            else{
                setisloggedin={setisloggedin}           
                toast.error("Some error occurred")
                navigate("/")
            }
       
        }
        useEffect(() => {
            getalldata()          
        }, [])

        const handleeyeclick=() => {
            if(icon.current.src.includes("icons/showpass.svg")) {
                icon.current.src="icons/hidepass.svg"
                setdisplay("text")          
            }
            else {
                icon.current.src="icons/showpass.svg"
                setdisplay("password")
            }       
        }

    
    
    const handleadd=async ()=>{
        if(url.current.value.length>0 && password.current.value.length>0 && username.current.value.length>0){
         
            axios.defaults.withCredentials=true
            const {data}=await axios.post("http://localhost:3000/senduserinfo",{username:username.current.value,websiteurl:url.current.value,storedpassword:password.current.value})
            if(data.success){
                await getalldata()
                password.current.value=""
                url.current.value=""
                username.current.value=""
                toast.success('Details successfully added!')
            }
            else {
                setisloggedin(false)
                navigate("/")
                console.log(data)
                toast.error("Authentication error, logging you out")
            }
        }
        else toast.error("Details filled incorrectly!")
    }
  return (
   <>
    <div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </div>
    <div className='md:mx-auto w-full md:w-3/4 mt-10'>
        <div className='text-center font-bold text-2xl'>
          <Mypass></Mypass>
        </div>
        <div className='text-center text-sm text-gray-500'>Your own password manager</div>
        <div className='flex flex-col gap-3'>
            <div><input  ref={url} className="border w-full border-green-500 rounded-full px-2" type="text" placeholder='Enter website URL' /></div>
            <div className='flex md:flex-row flex-col gap-2  relative'>
                <input ref={username} className='w-full border border-green-500 rounded-full px-2' placeholder='Enter Username' type="text" />
                <div className='relative w-full'>
                    <input ref={password} className='w-full border border-green-500 rounded-full px-2' placeholder='Enter Password' type={display} />
                    <div className="cursor-pointer absolute top-0 right-2"><img onClick={handleeyeclick} ref={icon} src="./icons/showpass.svg" alt="" /></div>
                </div>
                
            </div>          
            <button onClick={handleadd} className="px-3 cursor-pointer flex items-center self-center gap-4 w-fit hover:bg-blue-700 bg-blue-900 transition duration-300 hover:outline-1 hover:outline-green-950 rounded-full ">
                    <span className="font-semibold">ADD</span>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"                     
                        >
                    </lord-icon>
            </button>   
        </div>      
        {form.length>0 ?<Details form={form} setform={setform} password={password} url={url} username={username}/>:<Welcome displayname={displayname}/>}
    </div>
    </>
  )
}

export default Manager
