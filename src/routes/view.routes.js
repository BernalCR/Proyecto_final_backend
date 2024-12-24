import { Router } from "express";

const router = Router();


// Modificar la vista index.handlebars en el router de views ‘/products’, creada en la pre-entrega anterior, 
// para visualizar todos los productos con su respectiva paginación. Además, cada producto mostrado puede resolverse de dos formas:
// - Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. 
//   Además de un botón para agregar al carrito. Sugerencia de la ruta: “/products/:pid”.
// - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

// Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 

router.get("/products", (req,res) =>{
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sort = req.query.sort ? req.query.sort : "none";

    fetch(`http://localhost:8080/api/products/?page=${page}&limit=${limit}&sort=${sort}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del producto');
        }
        return response.json(); // Parsear la respuesta a JSON
    })
    .then(data => {
        res.render('products', data);
    })
});

router.get("/carts/:cid", (req,res) =>{
    const cartId = req.params.cid;
    fetch(`http://localhost:8080/api/carts/${cartId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del producto');
        }
        return response.json(); // Parsear la respuesta a JSON
    })
    .then(data => {
        console.log('============')
        console.log(data.products)
        res.render('carts', {array: data.products});
    })
});


export default router;