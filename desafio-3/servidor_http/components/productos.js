  import fs from "fs";
  class ProductManager {
    constructor () {
        this.products = [];
        this.path = "./productos.json";
        this.createFile();
    }


    createFile() {

        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }


    addProduct (product)  {
        if (this.validateCode(product.code)) {
            console.log ("Error, el codigo existe");
        } else {
            const producto = {id:this.generateId(), title: product.title, description:product.description, price:product.price, thumbnail:product.thumbnail, code:product.code, stock:product.stock};
            this.products = this.getProducts();
            this.products.push(producto);
            this.saveProducts();
            console.log("Producto agregado");
        }
    }

    updateProduct(id, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if ( pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].price = product.price;
            this.products[pos].thumbnail = product.thumbnail;
            this.products[pos].code = product.code;
            this.products[pos].stock = product.stock;
            this.saveProducts();
            console.log ("producto actualizado");
        } else {
            console.log ("No se encuentra");
        }
    }

    deleteProduct (id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex (item => item.id === id);
        if (pos > -1) {
            this.products.splice(pos,1); (0,1)
            this.saveProducts();
            console.log ("Producto eliminado");
        } else {
            console.log ("No encontrado");
        }
    }

    getProducts() {
        let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return products;
    }

    getProductsById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products.find(item => item.id === id) || "No encontrado";
    }

    validateCode(code) {
        return this.products.some (item => item.code === code);

    }

    generateId(){
        let max = 0;
        this.products.forEach (item => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max+1;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

 export default ProductManager;
