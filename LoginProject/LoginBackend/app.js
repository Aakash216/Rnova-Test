require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//myroutes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const chartRoutes = require("./routes/chart");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });


//middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//myroutes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chartRoutes);

//port

const port = process.env.PORT || 8100;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});