const fs = require("fs");

// crear contenido del archivo...
var contenido = "1234567890";
var iteraciones = 15;
for (var i = 0; i < iteraciones; i++) {
    contenido += contenido;
}

// ++ESCRIBIR DIRECTA (SIN UTILIZAR EL STREAM DE ESCRITURA)
fs.writeFile('./archivos/archivo1.txt', contenido, () => {
    console.log('escritura directa finalizada'); // termina #2
});

// ++ESCRIBIR CON EL STREAM DE ESCRITURA (METODO EFICIENTE)
const streamDeEscritura = fs.createWriteStream('./archivos/archivo2.txt');
streamDeEscritura.write(contenido, res => {
    console.log('escritura por stream finalizada'); // termina #1
});
// como el stream escribe progresivamente de manera asincrona y eficiente
// podriamos poner la linea ".write" dentro del bucle que genera texto
// y esta lo escribiria a medida que se acumula
// lo que haria todavia mas rapida la carga

