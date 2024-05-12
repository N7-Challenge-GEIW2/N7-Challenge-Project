const express = require('express');
const app = express();
const authRouter=require("./routers/auth.js")
const teacherManageRouter=require("./routers/teacherManage.js")

const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const cors=require("cors")

require('dotenv').config();

mongoose.connect("mongodb+srv://blockchain:blockchain@cluster.nszsxvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster").then(
    ()=>{
        console.log("mongoose deployed")
    }
)
// Middleware to parse JSON request bodies
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"],    
}))
app.use(express.json());
app.use("/",authRouter)
app.use("/",teacherManageRouter)
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
