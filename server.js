const Contact = require("./models/contact");
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allows requests from all devices (mobile, desktop, etc.)
const corsOptions = {
  origin: "*", // Allow all origins (update with your frontend URL in production)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });


// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// contact route
app.post("/contact", async (req, res) => {
  try {
    console.log("📍 Received request body:", req.body);
    
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      console.log("❌ Validation failed - missing fields");
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    console.log("💾 Attempting to save contact...");
    const savedContact = await newContact.save();
    console.log("✅ Saved to MongoDB:", savedContact._id);

    res.status(200).json({ message: "Message saved successfully", id: savedContact._id });

  } catch (error) {
    console.error("❌ Error saving to MongoDB:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
