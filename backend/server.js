require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE (IMPORTANT)
require("./config/db");

// ROUTES
app.use("/api/authRoutes", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});