const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(helmet({
    contentSecurityPolicy: false,
  }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.listen(5000, () =>
   console.log("Server running on port 5000")
);
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/projects", projectRoutes);
app.use("/uploads", express.static("uploads"));




