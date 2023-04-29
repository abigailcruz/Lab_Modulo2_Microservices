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



  //Perros por nombre o id
  router.get("/perros/:busqueda", (req, res) => {
    const busqueda = req.params.busqueda;
    const perrosFiltrados = data.filter(perro => perro.nombre_perro.toLowerCase().includes(busqueda.toLowerCase()) || perro.Id.toString() === busqueda);
  
    const response = {
      service: "perros",
      architecture: "microservices",
      length: perrosFiltrados.length,
      data: perrosFiltrados,
    };
  
    return res.send(response);
  });
  

  //perros segun raza
  router.get("/perro/:raza", (req, res) => {
    // busca los libros que contengan el título buscado
    const razas = data.datos_perros.perros.filter((raza) => {
      return raza.raza.includes(req.params.raza);
    });
    // crea una respuesta con información sobre los libros que coinciden con el título buscado
    const response = {
      service: "perros",
      architecture: "microservices",
      length: razas.length,
      data: razas,
    };
    return res.send(response); // devuelve la respuesta al cliente
  });
   

module.exports = router;