import express from "express";
// import dotenv from "dotenv";
require("dotenv").config({ path: "./config/.env" });

// read environment
// dotenv.config();

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
