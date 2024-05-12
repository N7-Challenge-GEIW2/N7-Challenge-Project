const express = require('express');
const app = express();
const authRouter=require("./routers/auth.js")
const teacherManageRouter=require("./routers/teacherManage.js")
const schedule=require("node-schedule")
const sendMail=require("./sendMail.js")
require('dotenv').config();

const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const cors=require("cors")


// the compition ending date
const closingDate = new Date('2024-05-13T23:24:00');

iscloseCompition=false
schedule.scheduleJob(closingDate, () => {
    iscloseCompition=true
    sendMail() // send to the administrator email
    console.log('Compition is closed')
    //send email to me with list 
  });



mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("mongoose deployed")
    }
)
// Middleware to parse JSON request bodies
app.use((req,res,next)=>{
    req.closeCompition=iscloseCompition
    next()
})
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
