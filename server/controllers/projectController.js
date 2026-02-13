const Project = require("../models/Project");
const mongoose = require("mongoose");


// ==============================
// CREATE PROJECT (SECURE)
// ==============================
exports.createProject = async (req, res) => {

    try {

        // 🔐 Secure: auto assign logged-in user as lead
        req.body.lead = req.user.id;

        const project = await Project.create(req.body);

        res.status(201).json(project);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// GET ALL PROJECTS (ADMIN)
// ==============================
exports.getAllProjects = async (req, res) => {

    try {

        const projects = await Project.find()
            .populate("lead", "name email")
            .populate("developers", "name email");

        res.json(projects);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// GET PROJECT BY ID ⭐ VERY IMPORTANT
// ==============================
exports.getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id)
            .populate("lead", "name email")
            .populate("developers", "name email");

        if (!project)
            return res.status(404).json("Project not found");

        res.json(project);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// LEAD PROJECTS
// ==============================
exports.getLeadProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            lead: req.user.id
        })
        .populate("developers","name email");

        res.json(projects);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// DEVELOPER PROJECTS
// ==============================
exports.getDeveloperProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            developers: new mongoose.Types.ObjectId(req.user.id)
        })
        .populate("lead","name email")
        .populate("developers","name email");

        res.json(projects);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// ASSIGN DEVELOPER (ADMIN / LEAD)
// ==============================
exports.assignDeveloper = async (req, res) => {

    try {

        const { projectId, developerId } = req.body;

        const project = await Project.findById(projectId);

        if (!project)
            return res.status(404).json("Project not found");

        // 🔐 RBAC SECURITY
        if (
            project.lead.toString() !== req.user.id &&
            req.user.role !== "Admin"
        ) {
            return res.status(403).json("Not authorized");
        }

        const devObjectId = new mongoose.Types.ObjectId(developerId);

        // ✅ Prevent duplicate developer
        if (!project.developers.some(id => id.toString() === developerId)) {
            project.developers.push(devObjectId);
        }

        await project.save(); // ✅ only once

        res.json("Developer assigned");

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// COMPLETE PROJECT
// ==============================
exports.completeProject = async (req, res) => {

    try {

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { status: "Completed" },
            { new: true }
        );

        res.json(project);

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// DELETE PROJECT ⭐ CRUD REQUIREMENT
// ==============================
exports.deleteProject = async (req, res) => {

    try {

        await Project.findByIdAndDelete(req.params.id);

        res.json("Project deleted successfully");

    } catch (err) {
        res.status(500).json(err.message);
    }
};



// ==============================
// UPLOAD DOCUMENT
// ==============================
exports.uploadDocument = async (req, res) => {

    try {

        const project = await Project.findById(req.params.projectId);

        if (!project)
            return res.status(404).json("Project not found");

        // 🔐 SECURITY CHECK
        if (
            project.lead.toString() !== req.user.id &&
            req.user.role !== "Admin"
        ) {
            return res.status(403).json("Not authorized");
        }

        // Save file path
        project.documents.push(req.file.filename);

        await project.save();

        res.json("File uploaded successfully");

    } catch (err) {

        res.status(500).json(err.message);
    }
};
