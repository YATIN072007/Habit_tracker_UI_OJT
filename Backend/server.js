import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./testdb.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend working!" });
});

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation to prevent crashes
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    res.json({ success: true, message: "Account created" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

