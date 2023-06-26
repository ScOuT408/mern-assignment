import express from "express";
import { verifyCookie } from "../middlewares/verifyCookie.js";
import {
  addComment,
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyCookie, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/update/:id", verifyCookie, updatePost);
router.delete("/delete/:id", verifyCookie, deletePost);

router.put("/like/:id", verifyCookie, likePost);
router.post("/comment", verifyCookie, addComment);

export default router;
