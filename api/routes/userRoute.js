import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyCookie } from "../middlewares/verifyCookie.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", verifyCookie, logoutUser);
router.get("/me", verifyCookie, getMyProfile);

export default router;
