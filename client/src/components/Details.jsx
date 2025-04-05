import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
const Details = ({ form, setform, password, url, username }) => {
    const handleedit = async (item) => {
        axios.defaults.withCredentials=true
        await axios.delete("http://localhost:3000/senduserinfo",{data:{recordid:item._id}})
        password.current.value = item.storedpassword
        url.current.value = item.websiteurl
        username.current.value = item.username
        let editeddata = form.filter(data => data["_id"] !== item["_id"])
        setform(editeddata)
    }
    const handledelete =async (item) => {
        axios.defaults.withCredentials=true
        let finaldata = form.filter(data => data["_id"] !== item["_id"])
        toast.success('Details successfully deleted!')    
        
        console.log(item._id)
        await axios.delete("http://localhost:3000/senduserinfo",{data:{recordid:item._id}})
        setform(finaldata)
    
    }

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
    }
    return (
        <>
        <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
        <table className="table-fixed w-full overflow-hidden rounded-xl mt-10">
            <thead className='bg-blue-800'>
                <tr>
                    <th className='w-[30%] py-2 border border-white '><span className='text-sm'>Website URL</span></th>
                    <th className='w-[25%]  py-2 border border-white'>Username</th>
                    <th className='w-[25%]  py-2 border border-white'>Password</th>
                    <th className='w-[20%] py-2 border border-white'>Actions</th>
                </tr>
            </thead>
            <tbody className='bg-red-300 w-full'>
                {form.map((item) => {
                    return (
                    <tr className='w-full' key={item["_id"]}>
                        <td className='w-[40%] text-center py-2 border border-white'>
                            <div className='w-full flex break-words items-center justify-center'>
                                <span className='w-[70%] break-words text-sm md:text-base'>{item.websiteurl}</span>
                                <span className="cursor-pointer" onClick={() => copytext(item.url)}><lord-icon
                                    src="https://cdn.lordicon.com/exymduqj.json"
                                    trigger="loop"
                                    delay="500"
                                    state="in-reveal"
                                    style={{"width":"17px","height":"18px"}}

                                >
                                </lord-icon></span>
                            </div>
                        </td>
                        <td className='w-[25%] text-center py-2 border border-white '>
                            <div className=' flex break-words  justify-center '>
                                <span className='w-[60%] break-words text-sm md:text-base'>{item.username}</span>
                                <span className="cursor-pointer" onClick={() => copytext(item.username)}><lord-icon
                                    src="https://cdn.lordicon.com/exymduqj.json"
                                    trigger="loop"
                                    delay="500"
                                    state="in-reveal"
                                    style={{"width":"18px","height":"18px"}}

                                >
                                </lord-icon></span>
                            </div>
                        </td>
                        <td className='w-[25%] text-center break-words py-2 border border-white'>
                            <div className='flex break-words items-center justify-center'>
                                <span className='w-[60%] break-words text-sm md:text-base'>{"*".repeat(item.storedpassword.length)}</span>
                                <span className="cursor-pointer" onClick={() => copytext(item.storedpassword)}><lord-icon
                                    src="https://cdn.lordicon.com/exymduqj.json"
                                    trigger="loop"
                                    delay="500"
                                    state="in-reveal"
                                    style={{"width":"18px","height":"18px"}}
                                >
                                </lord-icon></span>
                            </div>

                        </td>
                        <td className='w-[10%] text-center py-2 border border-white'>
                            <span onClick={() => handledelete(item)} className='cursor-pointer'><lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                style={{"width":"22px","height":"22px"}}
                            >
                            </lord-icon>
                            </span>
                            <span onClick={() => handleedit(item)} className='cursor-pointer'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                    trigger="hover"
                                    style={{"width":"22px","height":"22px"}}
                                >
                                </lord-icon>

                            </span>

                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
        </>
    )
}

export default Details
