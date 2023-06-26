import User from "../models/User.js";
import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";
import { sendToken } from "../utils/generateToken.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */

export const registerUser = asyncHandler(async (req, res) => {
  const { avatar, name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    res.status(400);
    throw new Error("Incomplete user data");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    avatar,
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json(
      { message: "User created successfully" },
      {
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
      }
    );
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400);
    throw new Error("Incomplete user data");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    sendToken(res, user, "User logged in successfully", 200);
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/logout
 * @access  Public
 */

export const logoutUser = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        secure: process.NODE_ENV === "production" ? true : false,
        httpOnly: process.NODE_ENV === "production" ? true : false,
        sameSite: process.NODE_ENV === "production" ? "none" : false,
        expires: new Date(Date.now()),
      })
      .json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/me
 * @access  Public
 */

export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const posts = await Post.find({ userId: req.user._id }).sort({
    createdAt: "desc",
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      posts,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
