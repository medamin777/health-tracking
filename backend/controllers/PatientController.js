const Patient=require("../models/Patient");
const nodemailer=require("nodemailer");
const user=require("../models/User");
const bcrypt=require("bcrypt")

//helper function to send email

async function sendPasswordByEmail(email,firstName,password)
{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:"Your Account Has Been Created ",
        html:`<p>Hello ${firstName} , your account has been created , your password is <b>${password}</b></p>`
    };
    try{
        await transporter.sendMail(mailOptions);
    }catch(error)
    {
        console.log(`failed to send email ${email}`,error);
        throw new Error("failed to send email ");
    }
    
}
exports.createPatient=async(req,res)=>{
    const {date_of_birth,gender,phone_number,email,firstName,lastName}=req.body;
    const doctorId=req.user.id; // Get the doctor's id from the jwt 
    const tempPassword=Math.random().toString(30).slice(-8);
    try{
        if (!email || !firstName || !lastName || !date_of_birth || !gender || !phone_number) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser=await user.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"user already exists"});
        const newUser=new user({
            email,
            password:await bcrypt.hash(tempPassword,10),
            role:"patient",
            firstName,
            lastName,
        })
        await newUser.save();
        const newPatient=new Patient({
            date_of_birth,
            gender,
            phone_number,
            user:newUser._id, //link to the user account
            doctor:doctorId  //Associate the patient with the doctor
        });
        await newPatient.save();
        // Send email to the patient
        await sendPasswordByEmail(email,firstName,tempPassword); 
        res.status(201).json({message:"Patient created successfully",patient:newPatient});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}


//Get Patient By Id
exports.getPatientForDcotor=async(req,res)=>{
    const doctorId=req.user.id;
    const {id}=req.params;
    try{
        const patient=await Patient.findById(id).populate('user','firstName lastName email phone_number');
        if(!patient)
            return res.status(404).json({message:"patient not found"});
        if(patient.doctor.toString()!==doctorId)
            return res.status(403).json({message:"unauthorized"})
        return res.json(patient);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to retrive patients"})
    }
}

// get all Patients
exports.getAllPatientsForDoctor=async(req,res)=>{

    const doctorId=req.user.id;
    try{
        const patients=await Patient.find({doctor:doctorId}).populate('user','firstName lastName email')
        if(!patients)
            return res.status(404).json({message:"patients not found"});

        res.json(patients);
    }catch(error)
    {
        console.log(error)
        res.status(500).json({error:"failed to retrive patients"})
    }
}
//update a patient
exports.updatePatientForDoctor=async(req,res)=>{
    const updates=req.body;
    const {id}=req.params;
    const doctorId=req.user.id;
    try{
        const patient=await Patient.findById(id);
        if(!patient)
            return res.status(404).json({message:"patient not found"});
        if(patient.doctor.toString()!==doctorId)
            return res.status(403).json({message:"unauthorized"})
        const updatePatient=await Patient.findByIdAndUpdate(id,updates,{new:true}).populate('user','firstName lastName email phone_number');
        res.json(updatePatient);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to update patient"})
    }
}
exports.deletePatient=async(req,res)=>{
    const {id}=req.params;
    const doctorId=req.user.id;
    try{
        const patient=await Patient.findById(id);
        if(!patient)
            return res.status(404).json({message:"patient not found"});
        if(patient.doctor.toString()!==doctorId)
            return res.status(403).json({message:"unauthorized"});

        await Patient.findByIdAndDelete(id);
        res.json({message:"patient deleted successfully"});

    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:"failed to delete patient"});
    }
}
