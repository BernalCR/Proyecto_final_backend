import { Router } from "express";
import ProductsManager from "../services/ProductManager.js";

// modificar el método GET / para que cumpla con los siguientes puntos; Deberá poder recibir por query params:
// - Un limit (opcional): permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10. 
// - Una page (opcional): permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
// - Un sort (opcional): asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
// - Un query (opcional): query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general

const router = Router();

const productsManager = new ProductsManager();

// listar
router.get("/", async (req, res) =>{
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const sort = req.query.sort ? req.query.sort : "none";

        const result = await productsManager.getAllProducts(limit, page, sort);
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${limit}&sort=${sort}` : ''
        result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${limit}&sort=${sort}` : ''

        result.isValid = !(page <= 0 || page > result.totalPages)
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

// Obtener 1
router.get("/:pid", async(req, res) =>{
    try {
        const id = req.params.pid;
        const product = await productsManager.getProductById(id);

        if(!product) return res.status(400).send("Producto no encontrado");
        
        res.json(product);
    } catch (error) {
        console.error(error);
    }
})

// Crear
router.post("/", async(req, res) =>{
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
