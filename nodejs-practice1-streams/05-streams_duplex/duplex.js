const fs = require("fs");
// libreria requerida para crear un stream duplex
const { Duplex } = require("stream");

const streamLectura = fs.createReadStream( "./archivos/base.txt" );
const streamEscritura = fs.createWriteStream("./archivos/destino.txt");

// STREAM DUPLEX: puede leer y escribir
const reporte = new Duplex( { // objetos json
    write(data, encode, callback){ // parametros necesarios
        console.log(data.toString());
        callback();
    },
    read(size){} // "write();" y "read();" = NOMBRES PREFEFINIDOS
});

// con el STREAM DUPLEX implementado, podemos tener un punto
// intermedio entre la lectura y la escritura
// sin interrumpir ninguno de sus 2 flujos
// ".pipe(reporte)" --> visualiza la info
streamLectura.pipe(reporte).pipe(streamEscritura);
