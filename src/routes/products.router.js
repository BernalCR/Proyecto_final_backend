import { Router } from "express";
import ProductsManager from "../services/ProductManager.js";

// Requisitos de esta api:
// 1) La ruta raíz GET / deberá listar todos los productos de la base.Agregue un query params limit cuya funcion sea el maximo de productos a traer.
// 2) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.
// 3) La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number (autogenerado)
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean (es true por defecto)
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto.
// 4) La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// 5) La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

// modificar el método GET / para que cumpla con los siguientes puntos; Deberá poder recibir por query params:
// - Un limit (opcional): permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10. (check)
// - Una page (opcional): permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
// - Un sort (opcional): asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
// - Un query (opcional): query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general

const router = Router();

const productsManager = new ProductsManager();

// listar
router.get("/", async (req, res) =>{
    try {
        console.log("hola")
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        let sort = 0;
        if(req.query.sort === "asc"){
            sort = 1;
        } else if(req.query.sort === "desc"){
            sort = -1;
        }

        // const sort = req.query.page ? req.query.sort : undefined;
        // const products = productsManager.getAllProducts(limit, page, sort);
        const products = await productsManager.getAllProducts(limit, page, sort);
        
        console.log(products)
        res.json(products);
    } catch (error) {
        console.error(error);
    }
})

// Obtener 1
router.get("/:pid", async(req, res) =>{
    try {
        const id = req.params.pid;
        console.log(typeof id)
        const product = await productsManager.getProductById(id);

        if(!product) return res.status(400).send("Producto no encontrado");
        
        res.json(product);
    } catch (error) {
        console.error(error);
    }
})

// Crear
router.post("/", async(req, res) =>{
    console.log("paso")
    try {
        const {name, price, description} = req.body;
        if(!name || !price || !description) return res.status(400).send("Todos los campos son obligatorios");

        const newProduct = await productsManager.addProduct({name, price, description});

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
    }
})

// Editar
router.put("/:pid", async(req, res) =>{
    try {
        const id = req.params.pid;

        const updatedProduct = await productsManager.updateProduct(id, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
})

//Eliminar
router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const deletedProduct = await productsManager.deleteProduct(id);
        console.log(deletedProduct);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
})
export default router;
