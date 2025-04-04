const jwt=require("jsonwebtoken");
//middleware for authentication

exports.authenticatejwt = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Split on space to get the token
    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Corrected typo here
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    });
};

//middleware to authorize docotor
exports.authorizeDoctor=(req,res,next)=>{
    if(req.user.role!=="doctor")
        return res.status(403).json({message:"unauthorized"});
    next();
}
exports.authorizePatient=(req,res,next)=>{
    if(req.user.role!=="patient")
        return res.status(403).json({message:"unauthorized"});
    next();
}