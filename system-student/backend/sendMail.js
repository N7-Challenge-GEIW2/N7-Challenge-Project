const nodemailer=require("nodemailer")
require('dotenv').config();
const path = require('path');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user:process.env.USER,
        pass:process.env.PASS
    }
})

const   mailOptions = {
    from :{
        name:"ENSET Compition",
        address:process.env.USER
    },
    to:process.env.USER,
    subject:"Compition is closed",
    text:"Hello world",
    attachments:[
        {
            filename:"registered users.csv",
            path:path.join(__dirname,"files","data.csv"),
        }
    ]
}

const sendMail=()=>{
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })


}
module.exports=sendMail