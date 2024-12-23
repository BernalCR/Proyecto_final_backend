
import productModel from "./models/products.model.js";
export default class ProductsManager{

    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    async getAllProducts (limit, page, sort){
        let paginate = await productModel.paginate({}, {limit: limit, page: page});
        let products = paginate.docs;
        
        if (sort === 1) {
            // Ordenar de menor a mayor
            products.sort((a, b) => a.price - b.price);
        } else if (sort === -1) {
            // Ordenar de mayor a menor
            products.sort((a, b) => b.price - a.price);
        }

        return products.map(prod=>prod.toObject());
    }

    async getProductById(id){
        let prod = await productModel.findOne({ _id: id });
        return prod;
    }

    async addProduct(prod){
        let newProduct = await productModel.create(prod);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const updatedProduct = await productModel.updateOne(
            { _id: id }, 
            { $set: updatedFields }
        );
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await productModel.deleteOne({ _id: id });
        return deletedProduct;
    }
}




