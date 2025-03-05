const express=require("express");
const router=express.Router();
const usercontroller=require("../controllers/UserController");

//register route
router.post('/register',usercontroller.register);

//login route
router.post('/login',usercontroller.login);

module.exports=router;


