// EVENT QUEUE
// las tareas se acumulan por orden de llegada
// en el THREAD POOL (V8 multi thread) se les asignan los threads necesarios para ser resueltas

// EVENTO LOOP (CICLO DE EVENTOS) (1 thread)
// sistema que mantiene este funcionamiento
// "bloqueo": proceso demasiado lento que retrasa el funcionamiento

// EJEMPLO DE BLOQUEO (codigo ineficiente)
const fs = require("fs");
var http = require("http");
 
function leerArchivo() {
  // // LENTA (deploy web: 600 ms)
  // fs.readFileSync("./archivos/archivo.txt", "utf8");

  // // RAPIDA (deploy web: 80 ms)
  // const streamlectura = fs.createReadStream("./archivos/archivo.txt", {encoding: "utf-8"});
}

http
  .createServer(function(req, res) {    
    for (let a = 0; a < 500; a++) {
        leerArchivo();
    }
    res.write("Hola mundo");  
    res.end();  
})
.listen(3000);