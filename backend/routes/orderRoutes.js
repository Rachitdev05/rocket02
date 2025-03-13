const express = require("express");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/orders/my-orders
//@desc Get Logged-in User's orders
//@access Private
router.get("/my-orders" , protect , async (req,res) => {
    try {
        //Find Orders for te Authenticated User
        const orders = await Order.find({user: req.user._id}).sort({
            createdAt: -1,
        })// Sort by most recent Orders
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "server ERROR   "})
        
    }
});


//@route GET /api/orders/:id
//@desc Get Order deatils by ID
//@access Private
router.get("/:id" , protect , async (req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order) {
            res.status(404).json({message: "Order Not found"});
        }
        //retun the Fulll Order Details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;
