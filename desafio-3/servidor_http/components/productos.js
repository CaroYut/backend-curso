/* const fs = require('fs');
export default class productManager {
    constructor() {
        this.productos = [];
        this.productoContadorId = 1;
        this.path = "./productos.json";
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log ("Completar campos");
            return;
        }
        const buscarProducto = this.productos.find((producto) => producto.code === code);
        if (buscarProducto) {
            console.log("El producto con ese codigo ya existe!");
            return; 
        }
            
      const newProducto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id : this.productoContadorId++
      }  
     
      this.productos.push(newProducto);
      console.log("Producto agregado");

       
     fs.writeFile(this.path, JSON.stringify(this.productos), (err) => {
        if (err) throw err;
        console.log('Archivo actualizado'); 
     }); 
   
    };
        
    getProducts = async () => {
        try {
            const informacion = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse (informacion);
            console.log(productos);
            return productos;
        } catch (error) {
            console.log (error);
            return;
        }
    };

    getProductById = async (productoId) => {
        const informacion = await fs.promises.readFile(this.path, "utf-8");
        const productosById = JSON.parse (informacion);
        const product = productosById.find((product) => product.id === productoId);
        if (product) {
            console.log (product);
            return product;
        } else {
            console.log("Producto no encontrado");
        }
    };

updateProduct = async (productoId, field, updateData) => {
    const informacion = await fs.promises.readFile (this.path, "utf-8");
    const products = JSON.parse (informacion);

    const index = products.findIndex ((product) => product.id === productoId);
    if (index === -1) {
        console.log ("Error: producto no encontrado");
        return;
    }
products [index][field] = updateData;
fs.writeFile (this.path, JSON.stringify(products), (err)=> {
    if (err) throw err;
    console.log ("Producto actualizado desde updateProduct")
})
}

deleteProduct = async (deleteById) => {
    const informacion = await fs.promises.readFile (this.path, "utf-8");
    const products = JSON.parse (informacion);
    const deleteItemFilter = products.filter ( 
        (product) => product.id !== deleteById
    );    
        if (deleteItemFilter.length === products.length){
            console.log (`Error, NO se encontro producto con id ${deleteById}`);
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), (err)=> {
            if (err) throw err;
            console.log("Producto borrado desde deleteProduct");

        });
};

}

/*
const productos = new productManager('./productos.json');
productos.addProduct('producto1', 'es un producto 1', 10, 'sin foto', '10', 5);
productos.addProduct('producto2', 'es un producto 2', 11, 'sin foto', '20', 15);
productos.addProduct('producto3', 'es un producto 3', 12, 'sin foto', '30', 35);
productos.addProduct('producto4', 'es un producto 4', 12, 'sin foto', '40', 50);
productos.addProduct('producto5', 'es un producto 5', 12, 'sin foto', '50', 65);
productos.addProduct('producto6', 'es un producto 6', 12, 'sin foto', '60', 80);
productos.addProduct('producto7', 'es un producto 7', 12, 'sin foto', '70', 95);
productos.addProduct('producto8', 'es un producto 8', 12, 'sin foto', '80', 110);
productos.addProduct('producto9', 'es un producto 9', 12, 'sin foto', '90', 125);
productos.addProduct('producto10','es un producto 10', 12, 'sin foto', '100',140);

*/ 

//console.log(productos.getProducts());
//console.log (productos.getProductById(2));
//productos.updateProduct(1,'description', 'producto demorado');
//productos.deleteProduct(3);

/*TEST 
[
    {
      title: 'producto1',
      description: 'es un producto',
      price: 10,
      thumbnail: 'sin foto',
      code: '10',
      stock: 5,
      id: 1
    },
    {
      title: 'producto2',
      description: 'es un producto nuevo',
      price: 11,/
      thumbnail: 'sin foto',
      code: '20',
      stock: 15,
      id: 2
    },
    {
      title: 'producto2',
      description: 'es un producto modificado',
      price: 12,
      thumbnail: 'sin foto',
      code: '30',
      stock: 35,
      id: 3
    }
  ]
  */

  

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
