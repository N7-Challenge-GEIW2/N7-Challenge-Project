const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require('../models/user.js');
const jwt=require("jsonwebtoken")
router.post('/register',async  (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new user({ cni: req.body.cni, password: hashedPassword, role: req.body.role});
    const result=await newUser.save()
    const {password,...others}=await result.toJSON()
    res.send(others);

});

router.post('/login',async (req, res) => {

    const user1 = await user.findOne({ cni: req.body.cni });
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

    const token=jwt.sign({_id:user1._id, cni:user1.cni,role:user.role,},process.env.TOKEN_SECRET||"secret")
    res.cookie("jwt",token,{httpOnly:true,
        maxAge:24*60*60*1000//1 day
    })
    const {password,...data}=await user1.toJSON()

    res.status(200).send(data);
})

router.get("/user",async (req,res)=>{
    try{
        const token=req.cookies.jwt
        const claims=jwt.verify(token,process.env.TOKEN||"secret")
        if(!claims){
            return res.status(401).send({message:"invalid token"})
        }
        const user1 = await user.findOne({_id:claims._id})
        const {password,...data}=await user1.toJSON()
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