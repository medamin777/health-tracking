const mongoose=require("mongoose")
const prescriptionSchema=new mongoose.Schema({
    patient:
    {
        type:mongoose.Schema.Types.ObjectId, // reference to the patient 
        ref:"Patient",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId, // reference to the doctor
        ref:"User",
        required:true
    },
    medication:{
        type:String,
        required:true

    },
    dosage:{
        type:String,
        required:true
    },
    instructions:{
        type:String
    },
    datePrescribed:{
        type:Date,
        default:Date.now
    },
});
module.exports=mongoose.model("Prescription",prescriptionSchema);