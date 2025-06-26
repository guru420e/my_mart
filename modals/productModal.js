import { getDb } from "../data/database.js";

class Product {
  constructor(productData) {
    this.titile = productData.title || "Untitled Product";
    this.summarty = productData.summary || "No summary available";
    this.price = productData.price || 0.0;
    this.description = productData.description || "No description available";
    this.image = productData.image;
    this.imagePath = `productsData/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
  }

  async save() {
    const db = getDb();

    const productData = {
      title: this.titile,
      summary: this.summarty,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.collection("products").insertOne(productData);
  }

  getDetails() {
    return `Product Name: ${this.name}, Price: $${this.price}, Description: ${this.description}`;
  }

  setPrice(newPrice) {
    this.price = newPrice;
  }
}

export default Product;
