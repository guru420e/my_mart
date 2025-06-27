console.log("Product delete script loaded");

const productList = document.querySelector("#product-grid");

productList.addEventListener("click", async (event) => {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.textContent.trim().toLowerCase() === "delete"
  ) {
    const productItem = event.target.closest("li");
    const productId = productItem.dataset.productid;
    const csrfToken = productItem.dataset.csur;

    try {
      const res = await fetch(`/admin/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include CSRF token for security
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      productItem.remove(); // Remove the product item from the DOM
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
      return;
    }
  }
});
