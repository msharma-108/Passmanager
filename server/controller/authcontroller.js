const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {usermodel,infomodel} = require("../model/usermodel.js")
exports.register=async(req,res)=>{
    const {name,email,password}=req.body
    if( !name || !password || !email) return res.json({success:false,message:"Missing details"})
    try{
        const existinguser=await usermodel.findOne({email})
        if(existinguser) return res.json({success:false , message:"This user already exists"})
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new usermodel({name,email,password:hashedpassword})
        const userdata= new infomodel({name,email})
        await user.save()
        await userdata.save()
        // const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        // res.cookie("token",token,{
        //     httpOnly:true,
        //     secure:process.env.NODE_ENV ==="production",
        //     sameSite: process.env.NODE_ENV==="production"?"none":"strict",
        //     maxAge:24*60*60*1000
        // })
        
        return res.json({success:true})
    }catch(e){
        res.json({success:false,message:e.message+"ashdhsakd"})
    }
} 


exports.login=async(req,res)=>{
    const{email,password}=req.body
    if(!email || !password) return res.json({success:false,message:"Email and password are required"})
    try{
        const user= await usermodel.findOne({email}) 
        const userdata= await infomodel.findOne({email}) 
        if(!user) return res.json({success:false,message:"User not found"})
        const passmatch=await bcrypt.compare(password,user.password)
        if(!passmatch) return res.json({success:false,message:"Incorrect password"})
        const token=jwt.sign({id:userdata._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite: process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:24*60*60*1000
        })  
        return res.json({success:true})
    }catch(e){
        res.json({success:false,message:e.message})
    }
}


exports.logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite: process.env.NODE_ENV==="production"?"none":"strict", 
        })
        return res.json({success:true,message:"User logged out"})
    }catch(e){
        res.json({success:false,message:e.message})
    }
}