const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    batch: String,

    branch: String,

    company: String,

    position: String,

    skills: String,

    bio: String

});


module.exports = mongoose.model("Profile", profileSchema);