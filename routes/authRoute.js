import express from "express";
import {
  getLoginController,
  signupConroller as getSignup,
  logoutController,
  postLoginContoller,
  postSignupConroller as postSignup,
} from "../controller/authController.js";
import {
  loginValidationMiddleWare,
  signupValidationMiddleWare,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", signupValidationMiddleWare, postSignup);
router.get("/login", getLoginController);
router.post("/login", loginValidationMiddleWare, postLoginContoller);
router.post("/logout", logoutController);

export default router;
