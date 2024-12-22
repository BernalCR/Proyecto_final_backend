import { Router } from "express";

const router = Router();


// Modificar la vista index.handlebars en el router de views ‘/products’, creada en la pre-entrega anterior, 
// para visualizar todos los productos con su respectiva paginación. Además, cada producto mostrado puede resolverse de dos formas:
// - Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. 
//   Además de un botón para agregar al carrito. Sugerencia de la ruta: “/products/:pid”.
// - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

// Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 

router.get("/", (req,res) =>{
    fetch('http://localhost:8080/api/products/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del producto');
        }
        return response.json(); // Parsear la respuesta a JSON
    })
    .then(data => {
        res.render('home', {productsArray: data});
    })
});
router.get("/realtime", (req,res) =>{
    res.render('realTimeProducts', {});
});

export default router;