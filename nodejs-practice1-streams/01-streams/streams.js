const fs = require('fs');

// ------------------------ POR QUE USAR STREAMS? (VELOCIDAD) ------------------------

console.time('tiempo de repsuesta');

// ++LECTURA SINCRONICA SIN USAR EL STREAM (301,577 ms)
for(let i = 0; i < 5; i++) {
    fs.readFileSync('archivo.txt', 'utf8');
}

// ++LECTURA ASINCRONICA USANDO EL STREAM (1,035 ms)
for(let i = 0; i < 5; i++) {
    const streamEscritura = fs.createReadStream('archivo.txt', { encoding: 'utf-8' });
}

console.timeEnd('tiempo de repsuesta');


