import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";

import mongoose from "mongoose";
import productModel from "./services/models/products.model.js"

// import { Server } from "socket.io";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewRoutes from "./routes/view.routes.js";

// Creo una instancia de nuestro servidor con Express
const app = express();

// Indicamos cual es el directorio public
app.use(express.static(__dirname + "/public"));

// Inicializamos el  motor que vamos a utilizar (en este caso handlebars)
app.engine("handlebars", handlebars.engine())
// Indicamos en qué parte del proyecto estarán las vistas
app.set('views', __dirname + '/views')
// Arranca el motor que inicializamos anteriormente
app.set('view engine', 'handlebars')

// configuracion para recibir archivos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = 8080;

app.get("/ping", (req, res) =>{
    res.send("pong")
})

app.use("/api/products", productsRouter)
app.use("/api/cart", cartsRouter)
app.use("/products", viewRoutes)


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando por el puerto ${PORT}`)
})


const connectMongoDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://bernalcristian2508:admin@cluster0.3jk9u.mongodb.net/Ecomm?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Conectado con exito a MongoDB usando Moongose.");

        /*let nuevoEstudiante = await studentsModel.create({
            name: "Luis",
            lastName : "Munar",
            age : "20",
        });*/

        /*let nuevoCurso = await coursesModel.create(
            {
                title: "Curso Backend",
                description: "Curso backend de NodeJS",
                teacherName: "Juan Torres"
            }
        );*/

        // let student = await studentsModel.findOne({_id: "640a705f72d18c48ca6f6741"});
        // console.log(JSON.stringify(student, null, '\t'));
        //student.courses.push({course: "640a719de27c256369c70d15"});
        //console.log(JSON.stringify(student));
        //let result = await studentsModel.updateOne(student);
        //console.log(result);

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();