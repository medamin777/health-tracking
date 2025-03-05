const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
exports.getNotificationForPatient=async(req,res)=>{
    const userId=req.user.id;  // get the user id from the JWT

    try{
        const patientId=await Patient.find({user:userId}).select("_id")._id;
        const notifications=await Notification.find({patient:patientId}).sort({date:-1}); //Get notifications for the patient
        if(!notifications)
            return res.status(404).json({message:"notifications not found"});
        res.json(notifications);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to retrive notifications"})
    }
}