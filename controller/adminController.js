import Product from "../modals/productModal.js";

export async function getAdminProductsController(req, res) {
  try {
    const products = await Product.findAll();

    res.render("admin/productView", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
    return;
  }
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

export async function getUpdateAdminProductController(req, res, next) {
  try {
    const product = await Product.findById(req.params.productId);
    const productId = product.id;
    res.render("admin/updateProduct", { productId, product });
  } catch (error) {
    next(error);
    return;
  }
}

export async function postUpdateAdminProductController(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.productId,
    image: req.file ? req.file?.filename : null,
  });

  try {
    await product.save();
  } catch (err) {
    next(err);
    return;
  }

  res.redirect("/admin/products");
}
