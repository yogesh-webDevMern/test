const express = require("express");
const productController = require("../controllers/productController");
const ProductRouter = express.Router();

ProductRouter.get("/get-data/:id?",productController.getAllProducts);
ProductRouter.get("/check-product-exists/:name",productController.checkProductExists);
// ProductRouter.post("/create",productController.createProduct);
// ProductRouter.put("/update/:id",productController.updateProduct);
// ProductRouter.delete("/delete/:id",productController.deleteProduct);

module.exports = ProductRouter;