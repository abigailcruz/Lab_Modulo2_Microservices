// Importamos el paquete express
const express = require("express");
const data = require("../../data/datos_perro"); // importa los datos de data_perro

// Creamos un objeto Router
const router = express.Router();


// define un controlador para la ruta raíz ("/")
router.get("/", (req, res) => {
    const response = {
      // crea una respuesta con información sobre los libros
      service: "perros",
      architecture: "microservices",
      length: data.length,
      data: data,
    };
   
    return res.send(response); // devuelve la respuesta al cliente
  }); 

module.exports = router;