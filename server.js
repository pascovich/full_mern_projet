import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import { checkUser, requireAuth } from "./middleware/authMiddleware.js";
import cors from "cors";
// require("dotenv").config({ path: "./config/.env" });

// read environment
dotenv.config({ path: "./config/.env" });

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sesionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// Middleware to  parse JSON request bodies

app.use(express.json());
app.use(cookieParser());

//check user token
app.get("*", checkUser);
app.get("/jwtId", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

const port = process.env.PORT || 5000;

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// mongodb://localhost:27017
