
 import express from "express";
 import ProductManager from "./components/productos.js";

 const app = express();
 app.use(express.urlencoded({extended:true}));
 const productManager = new ProductManager(); 
 let allProducts = productManager.getProducts(); 

 app.get("/products/", (req,res) => {

	const limit = parseInt(req.query.limit);
	const products = productManager.getProducts(); 
	if (!limit) {
		return res.send(products)  // si es distinto me trae todo los productos
	}
	const productLimit = products.slice(0, limit) // slice hace una copia del array y nos muestra una parte
	res.send(productLimit);
 }); 

 app.get("/products/:pid", (req,res) => {
	let pid = parseInt(req.params.pid);
	res.send({product:allProducts.find(item => item.id === pid) || "Error, el id del producto no existe"});
	

 });

 const PORT = 8080;

 app.listen(PORT, () => {
    console.log("Server is running: " + PORT);
 });



//TEST
//http://localhost:8080/products
//http://localhost:8080/products/?limit=5
 //http://localhost:8080/products/2

