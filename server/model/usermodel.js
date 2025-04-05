const { default: mongoose } = require("mongoose");

const userschema= new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    }
)
const sampleinfoschema=new mongoose.Schema({
    username:{type:String,required:true,default:""},
    websiteurl:{type:String,required:true,default:""},
    storedpassword:{type:String,required:true,default:""}
})
const dataschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    data:[sampleinfoschema]
})

const usermodel=mongoose.models.users || mongoose.model("user",userschema)
const infomodel=mongoose.models.infos || mongoose.model("info",dataschema)
exports.usermodel=usermodel 
exports.infomodel=infomodel 