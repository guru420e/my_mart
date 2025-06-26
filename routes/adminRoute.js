import express from "express";
import {
  getAdminNewProductController,
  getAdminProductsController,
  postAdminNewProductController,
} from "../controller/adminController.js";
const router = express.Router();

import configMulterMiddleware from "../middlewares/imageUpload.js";

router.get("/products", getAdminProductsController);

router.get("/products/new", getAdminNewProductController);

// Multer is added as middleware to handle file uploads
router.post(
  "/products/new",
  configMulterMiddleware,
  postAdminNewProductController
);

export default router;
