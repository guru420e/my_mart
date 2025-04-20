import express from 'express';
import { signupConroller } from '../controller/authController.js';

const router = express.Router();

router.get("/signup", signupConroller);

export default router;