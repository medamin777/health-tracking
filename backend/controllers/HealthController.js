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
            message:`New Parameters Recorded from${patient.firstName} ${patient.lastName}`
        })
        await notification.save();
        res.status(201).json({message:"health parameter added successfully",healthParameter})
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to create health parameter"});
    }
}
exports.getHealthParametersForPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const healthParameters = await HealthParameter.find({ patient: id }).sort({ timestamp: -1 });

        if (healthParameters.length === 0)
            return res.json({ message: "Health parameters not found" });

        return res.json(healthParameters);
    } catch (error) {
        console.log(error);
        return res.json({ error: "Failed to get health parameters" });
    }
};

exports.deleteHealthParameters = async (req, res) => {
    const { id } = req.params;
    try {
        const healthParameters = await HealthParameter.findById(id);
        if (!healthParameters)
            return res.json({ message: "Health parameter not found" });

        await HealthParameter.findByIdAndDelete(id);
        return res.json({ message: "Health parameter deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ message: "Error deleting health parameters" });
    }
};
