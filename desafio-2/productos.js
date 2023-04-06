const fs = require('fs');

class productManager {
    constructor() {
        this.productos = [];
        this.productoContadorId = 1;
        this.ruta = ruta;
    }

    addProduct = async (obj) => {
        const buscarProducto = this.productos.find((producto) => producto.code === code);
        buscarProducto
            ? console.log("El producto con ese codigo ya existe!") : !title || !description || !price || !thumbnail || !code || !stock
            ? console.log("Llenar campos") : this.productos.push(obj);
        const cadenaArchivo = JSON.stringify(this.productos);
     await fs.writeFile(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado'); 
    };
        
    }


    /*  addProduct = asyn (title, description, price, thumbnail, code, stock) => {
          const buscarProducto = this.productos.find((producto) => producto.code === code);
          buscarProducto
              ? console.log("El producto con ese codigo ya existe!") : !title || !description || !price || !thumbnail || !code || !stock
                  ? console.log("Llenar campos")
                  : this.productos.push({
                      title,
                      description,
                      price,
                      thumbnail,
                      code,
                      stock,
                      id: this.productoContadorId++,
                  })
      };
  */


         /* consultarUsuarios = async () => {
        const usuarios = await fs.promises.readFile (this.ruta, 'utf-8');
        return JSON.parse (usuarios)
       
       }
*/
    getProductos = async () => {
        try {
            const informacion = await fs.promises.readFile(this.ruta, "utf-8");
            const productos = JSON.parse (informacion);
            console.log(productos);
            return productos;
        } catch (error) {
            console.log (error);
            return;
        }
    };

    getProductById = async (productoId) => {
        const informacion = await fs.promises.readFile(this.ruta, "utf-8");
        const productsById = JSON.parse (informacion);
        const product = productsById.find((product) => product.id === productoId);
        if (product) {
            console.log (product);
            return product;
        } else {
            console.log("Error : producto no encontrado");
        }
    };

updateProduct = async (productoId, field, updateData) => {
    const informacion = await fs.promises.readFile (this.ruta, "utf-8");
    const products = JSON.parse (informacion);

    const index = products.findIndex ((product) => product.id === productoId);
    if (index === -1) {
        console.log ("Error: producto no encontrado");
        return;
    }
products [index][field] = updateData;
fs.writeFIle (this.ruta, JSON.stringify(products), (err)=> {
    if (err) throw err;
    console.log ("Producto actualizado desde updateProduct")
})
}

deleteProduct = async (deleteById) => {
    const informacion = await fs.promises.readFile (this.ruta, "utf-8");
    const products = JSON.parse (informacion);
    const deleteItemFilter = proudctos.filter ( 
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


const productos = new productManager();
productos.addProduct('producto1', 'es un producto', $10, 'sin foto', '10', 5);
console.log(productos.getProductos());