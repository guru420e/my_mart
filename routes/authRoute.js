import express from "express";
import {
  getLoginController,
  signupConroller as getSignup,
  postSignupConroller as postSignup,
} from "../controller/authController.js";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.get('/login',getLoginController);

export default router;
