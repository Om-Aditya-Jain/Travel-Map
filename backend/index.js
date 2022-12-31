const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/user");
dotenv.config();

app.use(express.json());

mongoose.connect(process.env.Mongo_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
 .then(()=>{
    console.log("MongoDB is connected successfully");
 })
 .catch((err)=>console.log(err));

app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);

app.listen(8800,()=>{
    console.log("Backend Server is running at port 8800")
})