const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
exports.getNoficationForUser=async(req,res)=>{
    const userId=req.user.id;
    try{
        const notifications=await Notification.find({receiver:userId}).sort({date:-1})
        if(!notifications)
            return res.status(404).json({message:"no notification found"})
        return res.json(notifications);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to retreive the notification "})
    }
}