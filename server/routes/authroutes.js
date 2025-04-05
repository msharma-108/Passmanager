const express=require("express")
const { register, login, logout } = require("../controller/authcontroller.js")
const authrouter=express.Router()
authrouter.post("/register",register)
authrouter.post("/login",login)
authrouter.post("/logout",logout)

module.exports=authrouter
