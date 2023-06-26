import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";

/**
 * @desc    Create a post
 * @route   POST /api/posts/create
 * @access  Private
 */

export const createPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body;

  if (content === "" && image === "") {
    res.status(400).json({ success: false, message: "Post cannot be empty" });
  }

  const post = await Post.create({
    content,
    image: image ? image : null,
    likes: [],
    userId: req.user._id,
  });

  if (post) {
    res
      .status(201)
      .json({ success: true, message: "Post created successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid post data" });
  }
});

/**
 * @desc    Get all posts
 * @route   POST /api/posts/
 * @access  Public
 */

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort("-createdAt").populate({
    path: "userId",
    select: "-password",
  });

  if (posts) {
    res.status(200).json({ success: true, posts });
  } else {
    res.status(400).json({ success: false, message: "Internal server error" });
  }
});

/**
 * @desc    Get post by id
 * @route   POST /api/posts/:id
 * @access  Public
 */

export const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id).sort("comments -createdAt").populate({
    path: "comments.userId",
    select: "name avatar",
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400).json({ success: false, message: "Post not found" });
  }
});

/**
 * @desc    Update a post
 * @route   PUT /api/posts/update/:id
 * @access  Private
 */

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    console.log(req.user._id);
    if (post.userId.toString() === req.user._id.toString()) {
      Post.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
          return res.status(200).json({ message: "Post updated" });
        })
        .catch((err) => {
          return res.status(404).json({ message: "Post not found" });
        });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Not authorized to edit the post" });
    }
  } else {
    res.status(400).json({ success: false, message: "Post not found" });
  }
});

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/delete/:id
 * @access  Private
 */

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.userId.toString() === req.user._id.toString()) {
      await Post.findByIdAndDelete(req.params.id);

      res.json({ message: "Post deleted" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Not authorized to edit the post" });
    }
  } else {
    res.status(400).json({ success: false, message: "Post not found" });
  }
});

/**
 * @desc    Like a post
 * @route   PUT /api/posts/like/:id
 * @access  Private
 */

export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
      await post.save();
      res.status(200).json({ likes: post.likes, userLiked: false });
    } else {
      post.likes = [...post.likes, req.user._id];
      await post.save();
      res.status(200).json({ likes: post.likes, userLiked: true });
    }
  } else {
    res.status(400).json({ success: false, message: "Post not found" });
  }
});

/**
 * @desc    Add a comment
 * @route   POST /api/posts/comment/
 * @access  Private
 */

export const addComment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;

  const post = await Post.findById(postId).populate({
    path: "comments.userId",
    select: "name avatar",
  });

  if (post) {
    const comment = {
      content,
      userId: req.user._id,
    };

    post.comments.push(comment);

    await post.save();
    res.status(201).json(post.comments);
  } else {
    res.status(400).json({ success: false, message: "Post not found" });
  }
});
