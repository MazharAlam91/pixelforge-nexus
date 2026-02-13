const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    deadline: Date,

    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active"
    },

    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    developers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    // ✅ ADD IT HERE (INSIDE SCHEMA)
    documents: {
        type: [String],
        default: []
    }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
