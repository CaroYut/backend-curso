import { Router } from "express";

import ProductManager from "../controller/ProductManager.js";

const productRouter = Router();

const product = new ProductManager();

productRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))  // sirve para mandar el nuevo producto a json
})


productRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
}) // nos responde con todos los productos

productRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
}) // nos responde con todos los productos id

productRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

productRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body
    res.send(await product.updateProducts(id, updateProduct))
})


export default productRouter