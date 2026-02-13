const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");


// PUBLIC ROUTE
router.post("/login", loginUser);


// ADMIN ONLY ROUTE
router.post("/register",
    authMiddleware,
    isAdmin,
    registerUser
);


// GET DEVELOPERS
router.get("/developers", authMiddleware, async (req, res) => {
    const devs = await User.find({ role: "Developer" });
    res.json(devs);
});


// ✅ GET PROJECT LEADS
router.get("/leads", authMiddleware, async (req, res) => {
    const leads = await User.find({ role: "ProjectLead" });
    res.json(leads);
});


module.exports = router;
