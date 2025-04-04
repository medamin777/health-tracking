const express=require("express");
const router=express.Router();
const usercontroller=require("../controllers/UserController");
const {authenticatejwt}=require("../middleware/authMiddleware")
const upload=require("../utils/UploadsFile");
//registration route ,use mutler middleware for image upload
router.post('/register',upload.single('profilePicture'),usercontroller.register);

//login route
router.post('/login',usercontroller.login);

//route to get the Current User
router.get('/current',authenticatejwt,usercontroller.getCurrentUser);

module.exports=router;
