const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Routes = require("./routes/formroute");
const feedbackRoutes = require("./routes/feedbackroute");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// DB connection
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.use("/", Routes);
app.use("/", feedbackRoutes);

const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`The server is listening at http://localhost:${PORT}`);
});
