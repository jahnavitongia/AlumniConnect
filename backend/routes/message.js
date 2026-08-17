const express = require("express");
const router = express.Router();

const Message = require("../models/Message");


// ==========================================
// SEND MESSAGE
// ==========================================

router.post("/send", async (req, res) => {

    try {

        const message = new Message({

            senderId: req.body.senderId,

            receiverId: req.body.receiverId,

            text: req.body.text,

            read: false

        });

        await message.save();

        res.json({
            message: "Message sent",
            data: message
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// MARK MESSAGES AS READ
// ==========================================

router.put("/read/:senderId/:receiverId", async (req, res) => {

    try {

        await Message.updateMany(

            {
                senderId: req.params.senderId,
                receiverId: req.params.receiverId,
                read: false
            },

            {
                $set: {
                    read: true
                }
            }

        );

        res.json({
            message: "Messages marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET UNREAD MESSAGE COUNT
// ==========================================

router.get("/unread/:userId", async (req, res) => {

    try {

        const count = await Message.countDocuments({

            receiverId: req.params.userId,

            read: false

        });

        res.json({
            count: count
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET ALL MESSAGES FOR USER
// ==========================================

router.get("/all/:userId", async (req, res) => {

    try {

        const messages = await Message.find({

            $or: [

                {
                    senderId: req.params.userId
                },

                {
                    receiverId: req.params.userId
                }

            ]

        }).sort({

            createdAt: -1

        });

        res.json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET CHAT BETWEEN TWO USERS
// ==========================================

router.get("/:user1/:user2", async (req, res) => {

    try {

        const messages = await Message.find({

            $or: [

                {
                    senderId: req.params.user1,
                    receiverId: req.params.user2
                },

                {
                    senderId: req.params.user2,
                    receiverId: req.params.user1
                }

            ]

        }).sort({

            createdAt: 1

        });

        res.json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;