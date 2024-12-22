// import fs from 'fs/promises';
// import path from 'path';

// const productsFilePath = path.resolve('data', 'products.json');

import productModel from "./models/products.model.js";
export default class ProductsManager{
    // constructor(){
    //     this.products = [];
    //     this.init();
    // }

    // async init(){
    //     try {
    //         const data = await fs.readFile(productsFilePath, "utf-8")
    //         this.products = JSON.parse(data);
    //     } catch (error) {
    //         this.products = [];
    //     }
    // }

    // async saveFile(){
    //     const jsonData = JSON.stringify(this.products, null, 2);
    //     await fs.writeFile(productsFilePath, jsonData)
    // }

    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    async getAllProducts (limit, page, sort){
        let paginate = await productModel.paginate({}, {limit: limit, page: page});
        let products = paginate.docs;
        
        const sortProd = (array, order) => {
            if (order === 1) {
              // Ordenar de menor a mayor
              array.sort((a, b) => a.price - b.price);
            } else if (order === -1) {
              // Ordenar de mayor a menor
              array.sort((a, b) => b.price - a.price);
            }
        }
        sortProd(products, sort)
        return products.map(prod=>prod.toObject());

        // return (limit) ? this.products.slice(0, limit) : this.products;
    }

    async getProductById(id){
        // return this.products.find(product => product.id === id)
        let prod = await productModel.findOne({ _id: id });
        return prod;
    }

    async addProduct(prod){
        // const newProduct = {
        //     id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
        //     ...prod,
        //     status: true,
        // }

        // this.products.push(newProduct);

        // this.saveFile();

        // return newProduct;
        console.log("---------")
        console.log(prod)

        let newProduct = await productModel.create(prod);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        // const productIndex = this.products.findIndex(product => product.id === id);
        // if (productIndex === -1) return null;

        // const updatedProduct = {
        //     ...this.products[productIndex],
        //     ...updatedFields,
        //     id: this.products[productIndex].id, // Aseguramos que el ID no se actualice
        // };


        // this.products[productIndex] = updatedProduct;
        // this.saveFile()
        // return updatedProduct;

        const updatedProduct = await productModel.updateOne(
            { _id: id }, 
            { $set: updatedFields }
        );
        return updatedProduct;
    }

    async deleteProduct(id) {
        // const productIndex = this.products.findIndex(product => product.id === id);
        // if (productIndex === -1) return null;

        // const deletedProduct = this.products.splice(productIndex, 1);
        // this.saveFile()
        // return deletedProduct[0];

        const deletedProduct = await productModel.deleteOne({ _id: id });
        return deletedProduct;
    }
}




