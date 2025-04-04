const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors=require("cors");
const path=require('path');
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes"); // Import patient routes
const prescriptionRoutes=require("./routes/PrescriptionRoutes");
const notificationRoutes=require("./routes/NotificationRoutes");
const healthParameterRoutes=require("./routes/HealthParametersRoutes");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// serve static files for uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
// Connect to MongoDB


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection error", error));

// Routes
app.use("/api/users", userRoutes); // User routes 
app.use("/api/patients", patientRoutes); // Patient routes
app.use("/api/prescriptions",prescriptionRoutes); //Prescription routes 
app.use("/api/notifications",notificationRoutes);  //Notification routes
app.use("/api/healthparameters",healthParameterRoutes); //healtparemets routes 
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/",(req,res)=>{
    res.json({message:"hello in pfa"});
})

