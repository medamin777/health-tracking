const express=require("express");
const router=express.Router();
const notificationController=require("../controllers/NotificationController");
const {authenticatejwt}=require("../middleware/authMiddleware");

//Route to get notification 


router.get('/',authenticatejwt,notificationController.getNoficationsForUser);

//Rotue to mark a notification as read 
router.patch('/:id/read',authenticatejwt,notificationController.markNotificationAsRead);

module.exports=router;
