const express = require("express");
const router = express.Router();

const Message = require("../models/Message");



// SEND MESSAGE

router.post("/send", async(req,res)=>{


    try{


        const message = new Message({

            senderId:req.body.senderId,

            receiverId:req.body.receiverId,

            text:req.body.text

        });



        await message.save();



        res.json({

            message:"Message sent",

            data:message

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});






// GET CHAT


router.get("/:user1/:user2", async(req,res)=>{


    try{


        const messages = await Message.find({

            $or:[

                {
                    senderId:req.params.user1,
                    receiverId:req.params.user2
                },

                {
                    senderId:req.params.user2,
                    receiverId:req.params.user1
                }

            ]


        }).sort({

            createdAt:1

        });



        res.json(messages);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});



module.exports=router;