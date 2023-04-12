const express = require ('express');

const PUERTO = 8080;

const server = express();
server.use(express.json);

server.use (express.urlencoded({extended:true}))



server.get ( '/saludo', (req,res) => {
	res.send('saludo desde el server express');
	
} );

server.listen(PUERTO, () => {
	console.log(`Servidor express activo en puerto ${PUERTO}`);
});

