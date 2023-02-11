// los diferentes tipos de stream pueden interactuar entre si a traves de los "pipes"

const fs = require("fs");

// creo streams de lectura y escritura
const streamLectura = fs.createReadStream( "./archivos/base.txt" );
const streamEscritura = fs.createWriteStream("./archivos/destino.txt");

// a medida que lee -> tmb lo escribe (se canaliza lo leido)    
streamLectura.pipe(streamEscritura);

streamLectura.on("end" , () => {
    console.log("proceso finalizado");
});