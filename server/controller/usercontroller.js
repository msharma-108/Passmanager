const {infomodel} = require("../model/usermodel.js")
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
exports.getinfo=async(req,res)=>{
        const infoid=req.body.id
        if(!infoid) return res.json({success:false,message:"Not authenticated"})
        try{
                let displayuserdata=await infomodel.findOne({_id:infoid})
                console.log(displayuserdata)
                if( displayuserdata.data.length>0){
                        displayuserdata.data.forEach(element=>{
                                element.storedpassword=cryptr.decrypt(element.storedpassword)
                        })
                }
               console.log(displayuserdata)
                return res.json({success:true,displayuserdata}) 
        }catch(error){
                return res.json({success:false,message:error.message+"sadasda"})
        }         
} 

exports.sendinfo=async(req,res)=>{ 
        const {id,username,websiteurl,storedpassword}=req.body
        if(!id) return res.json({success:false,message:"Not authenticated"})
        try{    
                const encryptpassword=cryptr.encrypt(storedpassword)
                console.log()
                const user=await infomodel.findOne({_id:id})
                console.log(encryptpassword)
                await infomodel.findOneAndUpdate({_id:id},{$set:{data:[...user["data"],{username,websiteurl,storedpassword:encryptpassword}]}})
                user.save()
                return res.json({success:true,user})
        }catch(error){
                return res.json({success:false,message:error.message})
        }
      
}

exports.deleterecord=async(req,res)=>{
        const {id,recordid}=req.body
        if(!id) return res.json({success:false,message:"Not authenticated"})
        try{ 
                const user=await infomodel.findOne({_id:id})
                let allrecords=user.data 
                allrecords=allrecords.filter(record=>record._id!=recordid)
                await infomodel.findOneAndUpdate({_id:id},{$set:{data:allrecords}})
                user.save()
                res.json({success:true,user})
        }catch(error){
                return res.json({success:false,message:error.message})
        }
       
}

