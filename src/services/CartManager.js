import cartsModel from "./models/carts.model.js";
import productModel from "./models/products.model.js";

export default class CartManager{
    constructor() { 
        console.log("Working students with Database persistence in mongodb");
    }

    async addCart(){
        let newCart = await cartsModel.create({});
        return newCart;
    }

    async getCart(id){
        let cart = await cartsModel.findOne({ _id: id });
        return cart;
    }

    async addProductToCart(cartId, productId){
        let cart = await cartsModel.findOne({ _id: cartId });
        if (!cart) return {status: "error", msg: "carrito no existe"};

        let prod = await productModel.findOne({ _id: productId });
        if(!prod) return {status: "error", msg: "Producto no existe"};

        const exist = await cartsModel.findOne({ _id: cartId, 'products.product': productId });
        console.log(exist);
        if(exist){
            const updatedCart = await cartsModel.updateOne(
                { _id: cartId, 'products.product': productId },  // Filtrar por el carrito y el _id del producto dentro del arreglo
                { $inc: { 'products.$.quantity': 1 } }  // Incrementar la cantidad del producto encontrado
            );
            return {status: "success", msg: updatedCart};
        }else{
            const newProduct = { product: productId, quantity: 1, }
            const updatedCart = await cartsModel.findByIdAndUpdate(cartId, {$push: { products: newProduct }} );
            return {status: "success", msg: updatedCart};
        }
    }
}


