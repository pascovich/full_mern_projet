import express from "express";
import {
  signup,
  getUsers,
  userInfo,
  follow,
  unfollow,
  signIn,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.get("/logout", logout);

router.get("/users", getUsers);
router.get("/users/:id", userInfo);
router.post("/users", signup);
router.patch("/follow/:id", follow);
router.patch("/unFollow/:id", unfollow);

// export router
export default router;
