
import { promises as fs} from "fs";
export default class ProductManager {
constructor () {
 this.patch = "./productos.json";
 this.products = [];
}

static id = 0;

addProduct = async (title,description,price,imagen,code,stock) => {

ProductManager.id++;
let newProduct = {
title,
description,
price,
imagen,
code,
stock,
id: ProductManager.id,
};

this.products.push(newProduct);

await fs.writeFile(this.patch, JSON.stringify(this.products))
};

readProducts = async () => {
let respuesta = await fs.readFile (this.patch, "utf-8");
return JSON.parse (respuesta);
};

getProducts = async () => {
};

getProductsById = async (id) => {
};


deleteProductsById = async (id) => {

let respuesta3 = await this.readProducts();
let productFilter = respuesta3.filter ((products) => products.id != id);
await fs.writeFile (this.patch, JSON.stringify (productFilter));
console.log ("Producto eliminado")

};

updateProducts = async ( {id, ...producto}) => {

await this.deleteProductsById (id);
let productoId = await this.readProducts ();
let productosModif = [{...producto,id}, ...productoId];
await fs.writeFile (this.patch, JSON.stringify (productosModif));
};
}

//const productos = new ProductManager ();
