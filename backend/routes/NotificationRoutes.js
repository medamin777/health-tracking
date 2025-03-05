const express=require("express");
const router=express.Router();
const notificationController=require("../controllers/NotificationController");
const {authenticatejwt,authorizePatient}=require("../middleware/authMiddleware");

//Route to get notification for a specific patient 

router.get('/',authenticatejwt,authorizePatient,notificationController.getNotificationForPatient);

module.exports=router;