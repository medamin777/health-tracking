const express=require("express");
const {authenticatejwt}=require("../middleware/authMiddleware");
const router=express.Router();

const healthController=require("../controllers/HealthController");

//route to add health parameters
router.post("/",authenticatejwt,healthController.createHealthParameter)
module.exports=router;