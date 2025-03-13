const express = require("express");
const router = express.Router();
const Subscriber = require('../models/Subscriber');

//@route POSt /api/subscribe
//@desc Handle newsletter subscriprion
//@access Pubic
router.post("/subscribe" , async (req , res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({ message : 'Email is required'});
    }
    try {
        //check if email is already subscribed
        let subscriber = await Subscriber.findOne({ email });
        if(subscriber) {
            return res.status(400).json({ message: "Email is already subscribed"});
        }

        //Create new Subscriber
        subscriber = new Subscriber({ email })
        await subscriber.save();
        res.status(201).json({message : "Sucessfully Subscribed to the newsletter"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
})

module.exports = router;