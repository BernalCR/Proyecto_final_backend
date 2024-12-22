// import fs from 'fs/promises';
// import path from 'path';

// const cartsFilePath = path.resolve('data', 'carts.json');
// const productsFilePath = path.resolve('data', 'products.json');

import cartsModel from "./models/carts.model.js";
import productModel from "./models/products.model.js";

export default class CartManager{
    // constructor(){
    //     this.carts = [];
    //     this.init();
    // }

    // async init(){
    //     try {
    //         const data = await fs.readFile(cartsFilePath, "utf-8")
    //         this.carts = JSON.parse(data);
    //     } catch (error) {
    //         this.carts = [];
    //     }
    // }

    // async saveFile(){
    //     const jsonData = JSON.stringify(this.carts, null, 2);
    //     await fs.writeFile(cartsFilePath, jsonData)
    // }

    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    async addCart(){
        // const newCart = {
        //     id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
        //     products: []
        // }

        // console.log(newCart);

        // this.carts.push(newCart);

        // this.saveFile();

        // return newCart;

        let newCart = await cartsModel.create(prod);
        return newCart;
    }

    async getCart(id){
        // return this.carts.find(cart => cart.id === id)

        let cart = await cartsModel.findOne({ _id: id });
        return cart;
    }

    async addProductToCart(cartId, productId){
        // const data = await fs.readFile(productsFilePath, "utf-8")
        // const allProducts = JSON.parse(data);

        // Validacion de que el id del carrito exista
        // const cart = this.carts.find(cart => cart.id === cartId);
        // if (!cart) return {status: "error", msg: "carrito no existe"};

        let cart = await cartsModel.findOne({ _id: id });
        if (!cart) return {status: "error", msg: "carrito no existe"};


        // Validacion de que el id del producto exista
        // const productToAdd = allProducts.find(product => product.id === productId)
        // if(!productToAdd) return {status: "error", msg: "Producto no existe"};

        let prod = await productModel.findOne({ _id: id });
        if(!prod    ) return {status: "error", msg: "Producto no existe"};

        const productsCard = cart.products;
        const index = productsCard.findIndex(prod => prod.product === productId);
        if(index === -1){
            const newProduct = {
                product: productId,
                quantity: 1,
            }

            // productsCard.push(newProduct);
            cartsModel.create(newProduct);
        }else{
            cartsModel.updateOne(
                { _id: cartId }, 
                { $inc: { quantity: 1 } }
            );
            // productsCard[index].quantity += 1;
        }


        // this.saveFile()

        return {status: "success", msg: "Producto añadido"};
    }
}


