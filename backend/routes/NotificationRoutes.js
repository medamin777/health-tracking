const express=require("express");
const router=express.Router();
const notificationController=require("../controllers/NotificationController");
const {authenticatejwt}=require("../middleware/authMiddleware");

//Route to get notification for a specific patient 


router.get('/',authenticatejwt,notificationController.getNoficationForUser);



module.exports=router;


