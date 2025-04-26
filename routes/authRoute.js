import express from "express";
import {
  getLoginController,
  signupConroller as getSignup,
  logoutController,
  postLoginContoller,
  postSignupConroller as postSignup,
} from "../controller/authController.js";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.get("/login", getLoginController);
router.post("/login", postLoginContoller);
router.post("/logout", logoutController);

export default router;
