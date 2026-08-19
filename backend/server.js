const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ],
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


// ===============================
// BODY PARSER
// ===============================

app.use(express.json());


// ===============================
// ROUTES
// ===============================

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const messageRoutes = require("./routes/message");
const opportunityRoutes = require("./routes/opportunityRoutes");


// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/opportunities", opportunityRoutes);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
    res.status(200).send("API Running");
});


// ===============================
// MONGODB
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:");
        console.log(error);
    });


// ===============================
// SERVER
// ===============================

app.listen(5001, () => {
    console.log("Server running on port 5001");
});