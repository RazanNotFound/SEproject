const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
// connect to mongo
connectDB();

// middleware
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // <-- VERY important for cookies
}));

app.use('/uploads', express.static('uploads'));

// routes
app.use("/api/v1", require("./routes/userRoutes"));
app.use("/api/v1/events", require("./routes/eventRoutes"));
app.use("/api/v1/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
