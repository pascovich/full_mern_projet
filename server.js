import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
// require("dotenv").config({ path: "./config/.env" });

// read environment
dotenv.config({ path: "./config/.env" });

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// mongodb://localhost:27017
