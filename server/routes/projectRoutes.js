const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
    createProject,
    getAllProjects,
    getLeadProjects,
    getDeveloperProjects,
    assignDeveloper,
    completeProject,
    uploadDocument,
    getProjectById,
    deleteProject
} = require("../controllers/projectController");


// ==============================
// ADMIN ROUTES
// ==============================

router.post("/", authMiddleware, isAdmin, createProject);

router.get("/all", authMiddleware, isAdmin, getAllProjects);

// ✅ MOVE DELETE HERE (IMPORTANT)
router.delete("/:id", authMiddleware, isAdmin, deleteProject);


// ==============================
// LEAD ROUTES
// ==============================

router.post("/assign", authMiddleware, assignDeveloper);

router.get("/lead", authMiddleware, getLeadProjects);


// ==============================
// DEVELOPER ROUTES
// ==============================

router.get("/developer", authMiddleware, getDeveloperProjects);


// ==============================
// UPLOAD DOCUMENT
// ==============================

router.post(
   "/upload/:projectId",
   authMiddleware,
   upload.single("document"),
   uploadDocument
);


// ==============================
// ID ROUTES (ALWAYS LAST)
// ==============================

router.get("/:id", authMiddleware, getProjectById);

router.put("/:id", authMiddleware, completeProject);


module.exports = router;
