const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");


// Create Profile
router.post("/create", async (req, res) => {

    try {

        const profile = new Profile(req.body);

        await profile.save();

        res.status(201).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Get Profile by User ID
router.get("/:userId", async (req, res) => {

    try {

        const profile = await Profile.findOne({
            userId: req.params.userId
        });


        if (!profile) {

            return res.status(404).json({
                message: "Profile not found"
            });

        }


        res.json(profile);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;