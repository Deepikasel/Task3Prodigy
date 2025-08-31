const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Public routes
app.get("/", (req, res) => res.send("Users API with JWT Auth"));
app.use("/auth", require("./routes/auth"));

// Protected users CRUD
app.use("/users", require("./routes/users"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server http://localhost:${port}`));
