import express, { query } from "express";
import ProductManager from "./components/productos.js";

const app = express();
app.use(express.urlencoded({extended:true}));

const productos = new ProductManager(); 
const leerProductos = productos.readProducts();
console.log (await leerProductos);

app.get("/products", async (req,res)=> {
	let limit = parseInt(req.query.limit);
	if (!limit) return res.send(await leerProductos) // si es distinto me trae todo los productos
	let allProducts = await leerProductos; // me trae todos los productos
	let productLimit = allProducts.slice(0, limit) // slice hace una copia del array y nos muestra una parte
	res.send(productLimit);  
}); 

app.get("/products/:id", async (req,res)=> {
	let id = parseInt (req.params.id);
	let allProducts = await leerProductos;
	let productosById = allProducts.find(product => product.id === id);
	res.send(productosById);
});

const PORT = 8080;

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running. http://localhost:${PORT}`)
})


/*
TEST
http://localhost:8080/products
http://localhost:8080/products/?limit=5
http://localhost:8080/products/5
*/