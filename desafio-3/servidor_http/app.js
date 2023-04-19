import express from "express";
import productManager from "./components/productos.js";

const server = express();
server.use(express.urlencoded({extended:true}));

const productos = new productManager(); 
const leerProductos = productos.getProducts();
console.log (await leerProductos);

/*
server.listen(PUERTO, () => {
	console.log(`Servidor express activo en puerto ${PUERTO}`);
});

const PUERTO = 8080;
*/