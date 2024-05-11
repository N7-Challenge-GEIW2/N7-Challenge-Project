const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require('../models/user.js');
const jwt=require("jsonwebtoken")
router.post('/register',async  (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new user({ name: req.body.name, email: req.body.email, password: hashedPassword });
    const result=await newUser.save()
    const {password,...others}=await result.toJSON()
    res.send(others);

});

router.post('/login',async (req, res) => {

    const user1 = await user.findOne({ email: req.body.email });
    if(!user1){
        return res.status(404).send({
            message:"Wrong Credentials"
        })
    }
    if(!await bcrypt.compare(req.body.password, user1.password)){
        return res.status(404).send({
            message:"Wrong Credentials"
        })
    }

    const token=jwt.sign({_id:user1._id, email:user1.email},process.env.TOKEN_SECRET||"secret")
    res.cookie("jwt",token,{httpOnly:true,
        maxAge:24*60*60*1000//1 day
    })
    res.send({
        message:"Login Success"
    });
})

router.get("/user",async (req,res)=>{
    try{
        const token=req.cookies.jwt
        const claims=jwt.verify(token,process.env.TOKEN||"secret")
        if(!claims){
            return res.status(401).send({message:"invalid token"})
        }
        const user = await user.findOne({_id:claims._id})
        const {password,...data}=await user.toJSON()
        return res.send(data)
    }catch(e){
        return res.status(401).send({message:"invalid token"})
    }   
    })


router.post("/logout",(req,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.send({
        message:"logout success"
    })


})
module.exports = router;