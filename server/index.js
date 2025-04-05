const express = require('express')
const cookieparser=require("cookie-parser")
require('dotenv').config()
const cors=require("cors")
// const { MongoClient, ObjectId } = require('mongodb');
const jwt=require("jsonwebtoken")
const connectDB=require("./config/mongodb")
const authrouter=require("./routes/authroutes")
const userrouter=require("./routes/userroutes")

const app = express()
const port = 3000
app.use(express.json())
const origin=["http://localhost:5173"]
app.use(cors({origin,credentials:true}))
app.use(cookieparser())
connectDB()
app.get("/api/auth/check", (req, res) => {
  console.log("asdasdad")
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false ,message:"no token" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true ,user});
  } catch {
    return res.json({ loggedIn: false });
  }
});

app.use(authrouter)
app.use(userrouter)


app.listen(port, () => { 
  console.log(`Example app listening on http://localhost:${port}`) 
}) 




// app.get('/', async (req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');  
//     const userdata = await collection.find({}).toArray();
//     res.json(userdata)
// }) 
// app.post('/', async (req, res) => {
//     const userdata=req.body
//     console.log("add body",userdata)
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');  
//     await collection.insertOne(userdata);
//     res.send({success:true})
//     console.log("add body",userdata)
  
// })
// app.delete('/', async (req, res) => {
//     const userid=req.body.item["_id"]
//     if(ObjectId.isValid(userid)){
//         const db = client.db(dbName);     
//         const collection = db.collection('passwords');  
//         await collection.deleteOne({"_id":new ObjectId(String(userid))});   
//         res.send({success:true}) 
//     }
//     else{
//         console.log("Cannot delete",req.body.item) 
//     }
// })