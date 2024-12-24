
import productModel from "./models/products.model.js";
export default class ProductsManager{

    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    async getAllProducts (limit, page, sort){
        let paginate = await productModel.paginate({}, {limit: limit, page: page, lean: true});
        
        if (sort === "asc") {
            // Ordenar de menor a mayor
            paginate.docs.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
            // Ordenar de mayor a menor
            paginate.docs.sort((a, b) => b.price - a.price);
        }

        return paginate;
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




