const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();



// REGISTER

router.post("/register", async(req,res)=>{


    try{


        const {
            name,
            email,
            password,
            role
        } = req.body;



        const existingUser = await User.findOne({

            email

        });



        if(existingUser){


            return res.status(400).json({

                message:"User already exists"

            });


        }




        const hashedPassword = await bcrypt.hash(

            password,

            10

        );



        const user = new User({


            name,

            email,

            password:hashedPassword,

            role


        });



        await user.save();




        res.status(201).json({


            message:"User Registered Successfully"


        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }


});






// LOGIN

router.post("/login", async(req,res)=>{


    try{


        const {

            email,

            password

        } = req.body;




        const user = await User.findOne({

            email

        });



        if(!user){


            return res.status(404).json({

                message:"User not found"

            });


        }




        const isMatch = await bcrypt.compare(

            password,

            user.password

        );




        if(!isMatch){


            return res.status(400).json({

                message:"Invalid password"

            });


        }




        console.log(
            "LOGIN USER:",
            user._id
        );





        res.json({


            message:"Login successful",



            user:{


                _id:user._id,


                name:user.name,


                email:user.email,


                role:user.role


            }



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