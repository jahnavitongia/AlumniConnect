const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log("MongoDB Error:", error);
});


app.get("/", (req, res) => {
    res.send("AlumniConnect Backend Running");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const profileRoutes = require("./routes/profile");

app.use("/api/profile", profileRoutes);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});

