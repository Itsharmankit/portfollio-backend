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

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// contact route
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }

  console.log("📩 New message received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone || "Not provided");
  console.log("Message:", message);

  res.json({ message: "Message received successfully" });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
