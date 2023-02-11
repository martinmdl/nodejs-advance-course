const fs = require("fs");
// librearia requerida para crear un stream duplex
const { Transform } = require("stream");

const streamLectura = fs.createReadStream( "./archivos/base.txt" );
const streamEscritura = fs.createWriteStream("./archivos/destino.txt");

streamLectura.setEncoding("utf8");

// STREAM TRANSFORM: puede modificar la data que lee
// antes de escribirla en el "destino.txt"
const filtro = new Transform( { // objetos json
    writableObjectMode: true,
    transform( data, encoding, callback){ // parametros necesarios
        // MODIFICAR = buffer -> pasar a String -> pasar a Mayus
        this.push(data.toString().toUpperCase())
        callback();
    },
    final(callback){ // "transform();" y "final();" = NOMBRES PREFEFINIDOS
        callback();
    }
});

// con el STREAM TRANSFORM implementado, podemos tener un punto
// intermedio entre la lectura y la escritura
// sin interrumpir ninguno de sus 2 flujos
// ".pipe(filtro)" --> modifica la info
streamLectura.pipe(filtro).pipe(streamEscritura);
