// EVENTOS PERSONALISADOS
// nos permiten tener control total del flujo de ejecucion
const fs = require("fs");
const streamEscritura = fs.createWriteStream("./archivos/mi_archivo.txt");
const EventEmitter = require('events');

class Emisor extends EventEmitter {} // CLASE
const miEmisor = new Emisor(); // INSTANCIA DE CLASE

function escribirEnArchivo() {

    var iteraciones = 5;
    for (var i = 0; i < iteraciones; i++) {
        streamEscritura.write(`Iteración #${i}\n`);
    }

    streamEscritura.write(`======= FIN =======`);
    streamEscritura.end();
}


function notificarPorCorreo() {
    console.log("preparando correo");
    // ".emit" = genera un evento (evento: "correoOK")
    setTimeout( () => {miEmisor.emit("correoOK")}, 1000 );
}

function leerDocumento() {
    fs.readFile('./archivos/mi_archivo.txt', (error, documento) => {
        console.log(documento.toString());
    });
}

// "close" = se activa cuando se cierra la tarea
// (estamos escuchando streamEscritura para no superponer tareas)
streamEscritura.on('close', () => {notificarPorCorreo();});

miEmisor.on("correoOK", ()=>{leerDocumento();});

escribirEnArchivo();
