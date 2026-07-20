const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({


    userId:{

        type:String,

        required:true

    },


    name:{

        type:String,

        required:true

    },


    batch:String,


    branch:String,


    company:String,


    position:String,


    skills:String,


    bio:String,



    profileImage:{

        type:String,

        default:""

    }


});


module.exports = mongoose.model(
    "Profile",
    profileSchema
);