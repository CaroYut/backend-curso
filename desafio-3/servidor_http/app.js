const fs = require ('fs');
const express = require ('express');
const { productManager } = ('./productos');

const PUERTO = 8080;

const server = express();
server.use(express.json);
server.use (express.urlencoded({extended:true}));

const newProduct = new productManager; 

server.get ( '/products', (req,res) => {
	const mostrarProducto = newProduct.getProducts 
    res.send(mostrarProducto);
} );

server.listen(PUERTO, () => {
	console.log(`Servidor express activo en puerto ${PUERTO}`);
});

