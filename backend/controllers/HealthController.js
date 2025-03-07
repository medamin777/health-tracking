const HealthParameter=require("../models/HealthParameters");
const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
const User=require("../models/User");

exports.addHealthParameter=async(req,res)=>{
    const {heart_rate,blood_pressure,temperature,oxygen_level}=req.body;
    const userId=req.user.id //this is the user id of the patient from jwt 
    try{  
        const patient=await Patient.findOne({user:userId});
        if(!patient)
            return res.status(404).json({message:"patient not found"})
        const healthParameter=new HealthParameter({
            patient:patient._id,
            heart_rate,
            blood_pressure,
            temperature,
            oxygen_level
        });
        const doctor=await User.findById(patient.doctor)
        await healthParameter.save();
        const notification=new Notification({
            sender:userId,
            receiver:doctor._id,
            message:'new health parameter recorded '
        })
        await notification.save();
        res.status(201).json({message:"health parameter added successfully",healthParameter})
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to create health parameter"});
    }
}