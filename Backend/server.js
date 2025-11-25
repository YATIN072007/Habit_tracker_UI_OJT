/* eslint-env node */
/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./testdb.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Simple ping route for testing
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedUsername = String(username).trim().toLowerCase();
    const plainPassword = String(password);

    if (!trimmedEmail.includes("@")) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { username: trimmedUsername }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, please login." });
    }

    const newUser = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      username: trimmedUsername,
      password: plainPassword,
    });

    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    };

    return res.status(201).json({
      message: "Signup successful.",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error in /api/signup:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Email/username and password are required.",
      });
    }

    const search = String(identifier).trim().toLowerCase();
    const plainPassword = String(password);

    const user = await User.findOne({
      $or: [{ email: search }, { username: search }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please sign up." });
    }

    if (user.password !== plainPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
    };

    return res.json({
      message: "Login successful.",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error in /api/login:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
