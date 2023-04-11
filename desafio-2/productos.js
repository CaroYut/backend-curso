const fs = require('fs');
const { test } = require('node:test');

class productManager {
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
fs.writeFIle (this.path, JSON.stringify(products), (err)=> {
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

const productos = new productManager('./productos.json');
productos.addProduct('producto1', 'es un producto', 10, 'sin foto', '10', 5);
productos.addProduct('producto2', 'es un producto nuevo', 11, 'sin foto', '20', 15);
productos.addProduct('producto2', 'es un producto modificado', 12, 'sin foto', '30', 35);

console.log(productos.getProducts());

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
      price: 11,
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