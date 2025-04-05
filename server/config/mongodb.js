const { default: mongoose, connection } = require("mongoose")
const connectDB= async()=>{
    connection.on("connected",()=>{console.log("DB connected "+process.env.MONGO_URI)})
    await mongoose.connect(`mongodb://localhost:27017/mypassnew`)
}
module.exports=connectDB