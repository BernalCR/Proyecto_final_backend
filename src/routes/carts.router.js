import { Router } from "express";
import CartManager from "../services/CartManager.js";

// Requisitos de esta api:
// Agregar al router de carts:
// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
// DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
// Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.





const router = Router();

const cartManager = new CartManager();


// Obtener productos de carrito
router.get("/:cid", async(req, res) =>{
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId);

        if(!cart) return res.status(400).send("Carrito no encontrado");
        
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
})

// Crear carrito
router.post("/", async(req, res) =>{
    console.log("paso")
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
    }
})

// Agregar producto a carrito
router.post("/:cid/products/:pid", async(req, res) =>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const response = await cartManager.addProductToCart(cartId, productId);
        const msg = `Status: ${response.status}. Mensaje: ${response.msg}`
        return (response.status === "error") ? res.status(400).send(msg) : res.send(msg); 
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await cartManager.emptyCart(cartId);
        const msg = `Status: ${result.status}. Mensaje: ${result.msg}`
        return (result.status === "error") ? res.status(400).send(msg) : res.send(msg); 
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const deletedProduct = await cartManager.deleteProduct(cartId, productId);
        const msg = `Status: ${deletedProduct.status}. Mensaje: ${deletedProduct.msg}`
        return (deletedProduct.status === "error") ? res.status(400).send(msg) : res.send(msg); 
    } catch (error) {
        console.error(error);
    }
})

router.put("/:cid/products/:pid", async(req, res) =>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity

        const updatedCart = await cartManager.updateQuantity(cartId, productId, newQuantity);

        const msg = `Status: ${updatedCart.status}. Mensaje: ${updatedCart.msg}`
        return (updatedCart.status === "error") ? res.status(400).send(msg) : res.send(msg); 

    } catch (error) {
        console.log(error);
    }
})
router.put("/:cid", async(req, res) =>{
    try {
        const cartId = req.params.cid;
        const newProducts = req.body

        const updatedCart = await cartManager.updateCart(cartId, newProducts);

        const msg = `Status: ${updatedCart.status}. Mensaje: ${updatedCart.msg}`
        return (updatedCart.status === "error") ? res.status(400).send(msg) : res.send(msg); 

    } catch (error) {
        console.log(error);
    }
})

export default router;