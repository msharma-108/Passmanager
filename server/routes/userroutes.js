const express=require("express")
const authmiddleware=require("../auth/authmiddleware.js")
const {getinfo,sendinfo,deleterecord}=require("../controller/usercontroller.js")
const userrouter=express.Router()
userrouter.get("/getuserinfo",authmiddleware,getinfo)
userrouter.post("/senduserinfo",authmiddleware,sendinfo)
userrouter.delete("/senduserinfo",authmiddleware,deleterecord)
module.exports=userrouter