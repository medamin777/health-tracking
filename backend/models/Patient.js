const mongoose=require("mongoose")
const patientSchema=new mongoose.Schema({
  
    date_of_birth:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    doctor:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"}
})

module.exports=mongoose.model("Patient",patientSchema);


