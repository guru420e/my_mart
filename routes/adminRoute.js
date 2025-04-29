import express from "express";
const router = express.Router();

router.get("/products", (req, res) => {
  res.render("admin/productView");
});

router.get("/products/new", (req, res) => {
  res.render("admin/newProduct");
});

export default router;
