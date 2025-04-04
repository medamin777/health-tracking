const express=require("express");
const router=express.Router();
const patientcontroller=require("../controllers/PatientController");
const {authenticatejwt,authorizeDoctor}=require("../middleware/authMiddleware")
const upload=require("../utils/UploadsFile");

//create a new patient
router.post('/',authenticatejwt,upload.single('profilePicture'),patientcontroller.createPatient);
//update a  patient
router.post('/:id',authenticatejwt,authorizeDoctor,patientcontroller.updatePatient);
//get patient
router.get('/:id',authenticatejwt,authorizeDoctor,patientcontroller.getPatientForDcotor);

// get all patients for a specific doctor 
router.get('/',authenticatejwt,authorizeDoctor,patientcontroller.getAllPatientsForDoctor);
// delete a patient

router.delete('/:id',authenticatejwt,authorizeDoctor,patientcontroller.deletePatient);

module.exports=router;