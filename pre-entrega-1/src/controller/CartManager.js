import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/cart.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts); // devuelve el producto parseado

    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));  //quien escribe en nuestros products
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    existeProducto = async (id) => {
        let carts = await this.readCarts();
        return carts.find(carts => carts.id === id)
    }

    getCartsById = async (id) => {
        let cartsById = await this.existeProducto(id);
        if (!cartsById) return "CARRITO NO ENCONTRADO"
        return productsById
    };

    addProductInCart = async (cartId, productId) => {

        let cartById = await this.existeProducto(cartId)
        if (!cartById) return "Carrito no encontrado"
        let productById = await productAll.existeProducto(productId)
        if (!cartById) return "Producto no encontrado"

        let cartsAll = await this.readCarts()

        let cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if (cartById.products.some(prod => prod.id === productId)) {
            let moreProductInCart = cartById.products.find(prod => prod.id === productId);
            moreProductInCart.cantidad++;

            let cartsConcat = [cartById, ...cartFilter];

            await this.writeCarts(cartsConcat);
            return "Producto sumado al carrito";
        }

        cartById.products.push({ id: productById.id, cantidad: 1 })

        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito"
    }



}


export default CartManager


