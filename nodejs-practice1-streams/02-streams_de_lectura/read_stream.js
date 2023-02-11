const fs = require("fs");

const streamLectura = fs.createReadStream( './archivos/mi_archivo.txt', { encoding: 'utf8' } );

// ".on" -> ve los eventos que ocurren durante todo el proceso de lecutra
streamLectura.on('open', () => {
    console.log('archivo abierto');
}).on('data', () => {
    // evidencia como el stream lee de manera progresiva
    console.log('leyendo datos...');
}).on('close', () => {
    console.log('archivo cerrado');
}).on('error', () => {
    console.log('error en la lectura del archivo');
})