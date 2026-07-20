const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

const upload = require("../middleware/upload");



// ===============================
// CREATE PROFILE
// ===============================

router.post("/create", async (req, res) => {

    try {


        console.log("CREATE PROFILE");
        console.log(req.body);



        const existingProfile = await Profile.findOne({

            userId:req.body.userId

        });



        if(existingProfile){

            return res.status(400).json({

                message:"Profile already exists"

            });

        }




        const profile = new Profile({

            userId:req.body.userId,

            name:req.body.name,

            batch:req.body.batch,

            branch:req.body.branch,

            company:req.body.company,

            position:req.body.position,

            skills:req.body.skills,

            bio:req.body.bio,

            profileImage:""

        });



        await profile.save();



        res.status(201).json({

            message:"Profile created successfully",

            profile

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }


});








// ===============================
// GET ALL PROFILES
// ===============================

router.get("/", async(req,res)=>{


    try{


        const profiles = await Profile.find();


        res.json(profiles);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// ===============================
// GET PROFILE BY USER ID
// ===============================

router.get("/:userId", async(req,res)=>{


    try{


        const profile = await Profile.findOne({

            userId:req.params.userId

        });



        if(!profile){


            return res.status(404).json({

                message:"Profile not found"

            });


        }



        res.json(profile);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// ===============================
// GET PROFILE BY PROFILE ID
// ===============================

router.get("/view/:id", async(req,res)=>{


    try{


        const profile = await Profile.findById(

            req.params.id

        );



        if(!profile){


            return res.status(404).json({

                message:"Profile not found"

            });


        }



        res.json(profile);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// ===============================
// UPDATE PROFILE
// ===============================

router.put("/update/:userId", async(req,res)=>{


    try{


        const profile = await Profile.findOneAndUpdate(

            {
                userId:req.params.userId
            },


            {


                name:req.body.name,

                batch:req.body.batch,

                branch:req.body.branch,

                company:req.body.company,

                position:req.body.position,

                skills:req.body.skills,

                bio:req.body.bio


            },


            {

                new:true

            }


        );



        res.json({

            message:"Profile updated successfully",

            profile

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// ===============================
// UPLOAD PROFILE IMAGE
// ===============================

router.post(

"/upload/:userId",

upload.single("profileImage"),

async(req,res)=>{


    try{


        console.log("UPLOAD ROUTE HIT");

        console.log("USER ID:");

        console.log(req.params.userId);



        console.log("FILE:");

        console.log(req.file);




        if(!req.file){


            return res.status(400).json({

                message:"No image uploaded"

            });


        }






        const profile = await Profile.findOneAndUpdate(

            {

                userId:req.params.userId

            },


            {

                profileImage:req.file.path

            },


            {

                new:true

            }


        );




        console.log("UPDATED PROFILE:");

        console.log(profile);





        res.json({

            message:"Image uploaded successfully",

            profile

        });





    }
    catch(error){


        console.log(error);



        res.status(500).json({

            message:error.message

        });


    }



});







module.exports = router;