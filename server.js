const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const DataRoutes = require("./Routes/DataRoutes");
const TokenRoute = require("./Routes/CheckTokenRoute");
const cors = require("cors");

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/images", express.static("images"));

app.use("/api/admin", authRoutes);
app.use("/api/products", DataRoutes);
app.use("/api/checktoken", TokenRoute);

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

const database = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Connected to Database");
});
