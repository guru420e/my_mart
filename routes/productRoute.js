import express from "express";

const router = express.Router();

router.get("/products", (req, res) => {
  res.render("customer/products/productsView");
});

export default router;
