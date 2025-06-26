import Product from "../modals/productModal.js";

export function getAdminProductsController(req, res) {
  res.render("admin/productView");
}

export function getAdminNewProductController(req, res) {
  res.render("admin/newProduct");
}

export async function postAdminNewProductController(req, res) {
  const product = new Product({ ...req.body, image: req.file.filename });
  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("Internal Server Error");
  }
}
