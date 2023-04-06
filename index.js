class productManager {
    constructor() {
        this.productos = [];
        this.productoContadorId = 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
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
                });
    };

    getProductos = () => this.productos;

    getProductById = (id) => {
        const productoId = this.productos.find((productoId) => productoId.id === id);
        console.log(productoId ? productoId : "Not found");
    };
}

const productos = new productManager();
productos.addProduct('producto1','es un producto',10,'sin foto','10',5);
productos.addProduct('producto2','es un producto nuevo',20,'sin foto','15',10);
productos.addProduct('producto3','es un producto renovado',30,'sin foto','20',15);
console.log(productos.getProductos());


/*TEST 
 node index.js
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
    price: 20,
    thumbnail: 'sin foto',
    code: '15',
    stock: 10,
    id: 2
  },
  {
    title: 'producto3',
    description: 'es un producto renovado',
    price: 30,
    thumbnail: 'sin foto',
    code: '20',
    stock: 15,
    id: 3
  }
] */