// Importamos el paquete express
const express = require("express");

//sqlite3
const db = require("../../config/database.js");

// Creamos un objeto Router
const router = express.Router();

consulta = "SELECT * FROM campeonatos"

// ejecuta la consulta y obtiene los resultados
db.all(consulta, [], (err, filas) => {
    if (err) {
      throw err;
    }
    // crea una lista de diccionarios con la información de los campeonatos
    const campeonatos = filas.map(fila => ({
      id: fila.id,
      id_campeon: fila.id_campeon,
      anio_campeonato: fila.anio_campeonato,
      lugar: fila.lugar,
      categoria_ganada: fila.categoria_ganada,
      pais_competencia: fila.pais_competencia,
      premio: fila.premio,
      puntaje: fila.puntaje
    }));
  
    // define una función que maneje la solicitud HTTP GET
    router.get("/", (req, res) => {
      const response = {
        service: "premios",
        architecture: "microservices",
        length: campeonatos.length,
        data: campeonatos
      };
      return res.send(response); // devuelve la respuesta al cliente
    });
  
    // cierra la conexión con la base de datos
    db.close();
  });


module.exports = router;