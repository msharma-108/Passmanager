const jwt=require("jsonwebtoken")
const authmiddleware= (req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.json({success:false,message:"Jwt token is required"})       
    } 
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
        req.body.id=decoded.id
        next()
    }catch(error){
        return res.json({success:false,message:error.message})
    }
    
    
}

module.exports=authmiddleware