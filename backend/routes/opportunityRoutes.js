const express = require("express");

const router = express.Router();

const Opportunity = require("../models/Opportunity");


// ==========================================
// GET ALL OPPORTUNITIES
// ==========================================

router.get("/", async (req, res) => {

    try {

        const opportunities =
            await Opportunity.find()
                .sort({
                    createdAt: -1
                });

        res.json(opportunities);

    } catch (error) {

        console.log(
            "OPPORTUNITY GET ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET OPPORTUNITY COUNT
// ==========================================

router.get("/count", async (req, res) => {

    try {

        const count =
            await Opportunity.countDocuments();

        res.json({
            count: count
        });

    } catch (error) {

        console.log(
            "OPPORTUNITY COUNT ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// CREATE OPPORTUNITY
// ==========================================

router.post("/", async (req, res) => {

    try {

        const opportunity =
            new Opportunity({

                title: req.body.title,

                company: req.body.company,

                type: req.body.type,

                location: req.body.location,

                description:
                    req.body.description,

                skills:
                    req.body.skills || "",

                postedBy:
                    req.body.postedBy

            });


        await opportunity.save();


        res.status(201).json({

            message:
                "Opportunity created successfully",

            data: opportunity

        });

    } catch (error) {

        console.log(
            "OPPORTUNITY CREATE ERROR:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;