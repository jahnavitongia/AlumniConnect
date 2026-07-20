const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(cors());

app.use(express.json());




// ROUTES

const authRoutes = require("./routes/authRoutes");

const profileRoutes = require("./routes/profile");

const messageRoutes = require("./routes/message");





app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/profile",
profileRoutes
);


app.use(
"/api/message",
messageRoutes
);






app.get("/",(req,res)=>{

    res.send("API Running");

});






mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log(error);

});







app.listen(5000,()=>{

    console.log(
        "Server running on port 5000"
    );

});