const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDb = require("./db/index.js");
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth.js");

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

connectDb(); // database connection

app.get("/", auth, (req, res) => {
  res.send({ data: req.decode, message: "user authetication success" });
});
app.use("/user", userRoutes);

app.listen(port, () =>
  console.log("App is live on http://localhost:" + port + " process_id:" + process.pid)
);
