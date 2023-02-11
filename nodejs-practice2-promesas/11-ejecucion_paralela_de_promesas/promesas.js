// Invocar diferentes PROMESAS y obtener una respuesta UNIFICADA
// Ejemplo: necesito reunir varios servicios y APIs antes de poder desplegar una pagina web

// DEFINICION PROMESA ESTANDAR
function mensajesPrivados() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("mensajes");
        }, 1500);
    });
}


function galeriaDeFotos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("fotos");
        }, 1500);
    });
}

function ultimasTransacciones() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("transacciones");
        }, 1500);
    });
}

// LLAMADO PROMESA ESTANDAR
// "Promise.all" -> necesitoReunir([esto, esto, esto])
Promise.all([
    mensajesPrivados(),
    galeriaDeFotos(),
    ultimasTransacciones()
]).then( (valores)=>{
    console.log( valores );
});