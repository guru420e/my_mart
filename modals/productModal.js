import { getDb } from "../data/database.js";
import { ObjectId } from "mongodb";

class Product {
  constructor(productData) {
    this.title = productData.title || "Untitled Product";
    this.summary = productData.summary || "No summary available";
    this.price = productData.price || 0.0;
    this.description = productData.description || "No description available";
    this.image = productData.image;
    this.imagePath = `productsData/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    this.id = productData._id?.toString() || null;
  }

  static async findAll() {
    const db = getDb();
    let res = [];
    try {
      res = await db.collection("products").find().toArray();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return res.map((pro) => {
      return new Product(pro);
    });
  }

  static async findById(productId) {
    const db = getDb();
    let productData;

    try {
      // Convert string ID to MongoDB ObjectId
      const objectId = new ObjectId(productId);

      productData = await db.collection("products").findOne({ _id: objectId });

      if (!productData) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      return new Product(productData);
    } catch (err) {
      // This will catch both DB errors and invalid ObjectId format errors
      console.error("Error finding product:", err);
      const error = new Error("Product not found or invalid ID format");
      error.statusCode = 404;
      throw error;
    }
  }
  async save() {
    const db = getDb();

    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    try {
      if (!this.id) await db.collection("products").insertOne(productData);
      else {
        if (this.image) productData.image = this.image;
        else delete productData.image;
        delete productData.id;
        await db
          .collection("products")
          .updateOne({ _id: new ObjectId(this.id) }, { $set: productData });
      }
    } catch (err) {
      throw new Error("Error saving product: " + err.message);
    }
  }

  getDetails() {
    return `Product Name: ${this.name}, Price: $${this.price}, Description: ${this.description}`;
  }

  setPrice(newPrice) {
    this.price = newPrice;
  }
}

export default Product;
