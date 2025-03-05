const express=require("express");
const router=express.Router();
const patientcontroller=require("../controllers/PatientController");
const {authenticatejwt,authorizeDoctor}=require("../middleware/authMiddleware")



//create a new patient
router.post('/',authenticatejwt,authorizeDoctor,patientcontroller.createPatient);
//update a  patient
router.post('/:id',authenticatejwt,authorizeDoctor,patientcontroller.updatePatientForDoctor);
//get patient
router.get('/:id',authenticatejwt,authorizeDoctor,patientcontroller.getPatientForDcotor);

// get all patients
router.get('/',authenticatejwt,authorizeDoctor,patientcontroller.getAllPatientsForDoctor);
// delete a patient

router.delete('/:id',authenticatejwt,authorizeDoctor,patientcontroller.deletePatient);

module.exports=router;