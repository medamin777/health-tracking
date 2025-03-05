const HealthParameter=require("../models/HealthParameters");
const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
exports.createHealthParameter=async(req,res)=>{
    const {heart_rate,blood_pressure,temperature,oxygen_level}=req.body;
    const userId=req.user.id;
    const doctorId=req.body.doctorId
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
        await healthParameter.save();
        const notification=new Notification({
            patient:patient._id,
            doctor:doctorId,
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




