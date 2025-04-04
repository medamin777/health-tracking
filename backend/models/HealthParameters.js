const mongoose=require("mongoose");
const HealthParameterSchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    heart_rate:{
        type:Number,
        required:true
    },
    blood_pressure:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    oxygen_level:{
        type:Number,
        required:true
    },
    
})
module.exports=mongoose.model("HealthParameter",HealthParameterSchema);