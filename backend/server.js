const express = require("express");
const connectDB = require("./config/db");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongo
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
