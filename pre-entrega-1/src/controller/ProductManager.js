import { promises as fs } from 'fs';
 import { nanoid } from 'nanoid'; 

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  
  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products); // devuelve el producto parseado

  }

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));  //quien escribe en nuestros products
  }



  existeProducto = async (id) => {
    let products = await this.readProducts();
    return products.find(prod => prod.id == id)
  }

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid()
    let productAll = [...productsOld, product]; // recibe lo que tenia antes y agrega lo nuevo
    await this.writeProducts(productAll);
    return "Producto agregado";
  };

  getProducts = async () => {
    return await this.readProducts()
  };

  getProductsById = async (id) => {

    let productsById = await this.existeProducto(id);
    if (!productsById) return "PRODUCTO NO ENCONTRADO"
    return productsById
  };

  deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProducto = products.some(prod => prod.id == id)
    if (existProducto) {
      let filterProducts = products.filter(prod => prod.id == id)  // queda un array sin el prod q elimine
      await this.writeProducts(filterProducts)
      return "Producto eliminado"
    }
    return "Producto inexistente"
  }



  updateProducts = async (id, product) => {  //me sirve para actualizar
    let productById = await this.exist(id) // se fija si existe
    if (!productById) return "Producto no encontrado" //si no existe retorna eso
    await this.deleteProducts(id) // si existe lo elimina 
    let productsOld = await this.readProducts() //trae los productos anteriores
    let products = [{ ...product, id: id }, ...productsOld] // me suma el P nuevo con los viejos
    await this.writeProducts(products) // vuelve a escribirlo
    return "PRODUCTO ACTUALIZADO"
  }

}

export default ProductManager
