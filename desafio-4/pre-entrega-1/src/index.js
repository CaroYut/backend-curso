import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import {engine} from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./controller/ProductManager.js";
import {Server} from 'socket.io';


const WS_PORT = 8080;
const PORT = 4000;
const product = new ProductManager ();

// servidor express base
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = app.listen (WS_PORT, () =>{
    console.log (`servidor socketIO iniciado en puerto ${WS_PORT}`)
});

const wss = new Server (httpServer, {
    cors: {
     origin: "http://localhost:3000"
   }})
  
   wss.on('connection', (socket) => {
    console.log (`Cliente conectado (${socket.id})`);
   
   
    socket.emit('server_confirm', 'conexion recibida');
     socket.on('disconnect',(reason) =>{
      console.log (`cliente desconectado (${socket.id}) : ${reason}`);
      });
      socket.on('event_cl01',(data) =>{
       console.log(data);
      });
    });

// estructura motor de plantilla
app.engine ("handlebars", engine())
app.set ("view engine", "handlebars")
app.set ("views", path.resolve (__dirname + "/views"))

// contenido estatico
app.use("/", express.static(__dirname + "/public"))

app.get ("/", async (req,res) => {
    let allProducts = await product.getProducts()
    res.render ("home", {
      title: "handlebars | websocket",
      products : allProducts
      
      })
    })
    
//no estoy segura, asique si no funciona es por realtime
    app.get ("/realtimeproducts", async (req,res) => {
        let allProducts = await product.getProducts()
        res.render ("realTImeProducts", {
          title: "handlebars | websocket",
          products : allProducts
          
     })
   })   



// endpoints api 
app.use("/api/products", productRouter)

app.use("/api/cart", CartRouter)

app.listen(PORT, () => {
    console.log(`Servidor express puerto ${PORT}`)
});


