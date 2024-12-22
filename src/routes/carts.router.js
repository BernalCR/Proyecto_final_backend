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

// Obtener productos de carrito
router.get("/:pid", async(req, res) =>{
    try {
        const id = parseInt(req.params.pid);
        const cart = await cartManager.getCart(id);

        if(!cart) return res.status(400).send("Carrito no encontrado");
        
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
})

// Agregar producto a carrito
router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const response = await cartManager.addProductToCart(cartId, productId);
        const msg = `Status: ${response.status}. Mensaje: ${response.msg}`
        return (response.status === "error") ? res.status(400).send(msg) : res.send(msg); 
    } catch (error) {
        console.error(error);
    }
})


export default router;