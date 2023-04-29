// Importamos el paquete express
const express = require("express");

const axios = require("axios");


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
  //db.close();
});




// TODO: Ejercicio 1
router.get("/campeonatos/:categoria/:paiscompetencia", (req, res) => {
  const categoria = req.params.categoria;
  const paiscompetencia = req.params.paiscompetencia;
  const consulta = `SELECT * FROM campeonatos WHERE categoria_ganada = '${categoria}' AND pais_competencia = '${paiscompetencia}'`;
  try{
  db.all(consulta, [], (err, filas) => {
    if (err) {
      throw err;
    }
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


    const response = {
      service: "premios",
      architecture: "microservices",
      length: campeonatos.length,
      data: campeonatos
    };
    
    return res.send(response);
  });
  }
  catch(err){
    return res.status(500).send({ err });
  }
});


// TODO: EJERCICIO 3 



//TODO: EJERCICIO 4 
 
router.get("/:puntaje/:pais", (req, res) => {
  const puntaje = req.params.puntaje;
  const paiscompetencia = req.params.paiscompetencia;
  const asteriscos = "*".repeat(Math.floor(parseInt(puntaje)/10)); // obtenemos la cantidad de asteriscos según el puntaje
  const consulta = `SELECT * FROM campeonatos WHERE puntaje = '${asteriscos}' AND pais_competencia = '${paiscompetencia}'`;
  
  db.all(consulta, [], (err, filas) => {
    if (err) {
      throw err;
    }
    const campeonatos = filas.map(fila => ({
      id: fila.id,
      raza: fila.raza,
      pais_competencia: fila.pais_competencia,
    }));
  
    const response = {
      service: "premios",
      architecture: "microservices",
      length: campeonatos.length,
      data: campeonatos
    };
    
    return res.send(response);
  });
});





module.exports = router;

