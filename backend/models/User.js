const mongoose=require("mongoose");
const validator=require("validator")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:porps=>`${porps.value} is not a valid email`
            }
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String ,// store the file path of the picture
        default:null
    },
    role:{
        type:String,
        enums:['patient','doctor'],
        required:true,
    },
    address:{
        type:String,
    }
})
module.exports=mongoose.model("User",userSchema);