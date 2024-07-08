import express from "express";
import {
  readPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", readPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/unlike-post/:id", unlikePost);

// export router
export default router;
