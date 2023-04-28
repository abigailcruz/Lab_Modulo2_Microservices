// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

//Funcion para parsear csv a json
const Papa = require("papaparse");
const fs = require("fs");

const filePath = "./data/raza_info.csv";
const fileContent = fs.readFileSync(filePath, "utf-8");

const csvToJson = Papa.parse(fileContent, {
  header: true,
  dynamicTyping: true,
});


// Creamos la ruta para obtener todos los lenguajes
router.get("/", (req, res) => {
    // Creamos un objeto de respuesta con los datos de los lenguajes
    const response = {
      service: "razas",
      architecture: "microservices",
      data: csvToJson.data,
    };
  
    // Enviamos la respuesta
    return res.send(response);
  });
  



module.exports = router;