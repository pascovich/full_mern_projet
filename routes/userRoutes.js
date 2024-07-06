import express from "express";
import { signup, getUsers } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", signup);

// export router
export default router;
