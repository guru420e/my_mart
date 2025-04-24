import express from "express";
import {
  signupConroller as getSignup,
  postSignupConroller as postSignup,
} from "../controller/authController.js";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", postSignup);

export default router;
