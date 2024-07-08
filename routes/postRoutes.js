import express from "express";
import {
  readPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  editCommentPost,
  deleteCommentPost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", readPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/unlike-post/:id", unlikePost);

router.patch("/comment-post/:id", commentPost);
router.patch("/edit-comment-post/:id", editCommentPost);
router.patch("/delete-comment-post/:id", deleteCommentPost);

// export router
export default router;
