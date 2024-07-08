import express from "express";
import {
  signup,
  getUsers,
  userInfo,
  follow,
  unfollow,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", userInfo);
router.post("/users", signup);
router.patch("/follow/:id", follow);
router.patch("/unFollow/:id", unfollow);

// export router
export default router;
