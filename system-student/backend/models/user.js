const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    cni:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","teacher"],
        default:"student"
    }
})

module.exports=mongoose.model("User",userSchema)