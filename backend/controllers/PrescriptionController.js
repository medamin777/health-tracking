const Prescription=require("../models/Prescription");
const Notification=require("../models/Notification");
const Patient=require("../models/Patient");
//create a new prescription
exports.createPrescription=async(req,res)=>{
    const {patient,medication,dosage,instructions}=req.body;
    const doctorId=req.user.id;
    try{
        const prescription=new Prescription({
            patient,
            doctor:doctorId,
            medication,
            dosage,
            instructions
        });
    await prescription.save();
    const notification=new Notification({
        sender:doctorId,
        receiver:patient.user,
        message:`new prescription created  from ${medication}`
    })
    await notification.save();
    res.status(201).json({message:"prescription created successfully",prescription});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to create prescription"});
    }
}
//get all prescriptions for a patient By id
exports.getPrescriptionForPatient=async(req,res)=>{
    let patientId;
    try{
        if(req.user.role==="patient")
        {
            const patient=await Patient.findOne({user:req.user.id});
            if(!patient)
                return res.status(404).json({message:"patient not found"})
            patientId=patient._id;
        }
        else
            patientId=req.params.id;
        const prescriptions=await Prescription.find({patient:patientId}).sort({datePrescribed:-1}).populate('doctor','firstName lastName ')
        if(!prescriptions)
            return res.status(404).json({message:"prescriptions not found"});
        res.json(prescriptions);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to retrive prescriptions"})
    }
}
//get all prescriptions for a patient
exports.updatePrescriptionForPatient=async(req,res)=>{

    const {id}=req.params;
    const updates=req.body;
    const doctorId=req.user.id;
    try{
        const prescription=await Prescription.findById(id);
        if(!prescription)
            return res.status(404).json({message:"prescription not found"});
        if(prescription.doctor.toString()!==doctorId)
            return res.status(403).json({message:"unauthorized to update this prescription"});

        //update the prescription with new data 

        const updatePrescription=await Prescription.findByIdAndUpdate(id,updates,{new:true});
        res.json(updatePrescription);

    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to update prescription"});
    }
}