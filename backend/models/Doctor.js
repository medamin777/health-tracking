const mongoose =require("mongoose");
const doctorSchema=new mongoose.Schema({
    
    specialization:{
        type:String
    },
    license_number:{
        type:String,
        required:true
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}// reference to user
});
module.export=mongoose.model("Doctor",doctorSchema);
