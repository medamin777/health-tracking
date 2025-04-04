const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
exports.getNoficationsForUser=async(req,res)=>{
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
exports.markNotificationAsRead=async(req,res)=>{
    const notificationId=req.params.id;

    try{
        const notification=await Notification.findById(notificationId);
        if(!notification)
            return res.status(404).json({message:"notification not found"});

        notification.read=true;
        await notification.save();
        res.json({message:"notification marked as read",notification});
    }catch(error)
    {
        console.log(error);
        res.json({message:"failed to mark notification as read"});
    }
}