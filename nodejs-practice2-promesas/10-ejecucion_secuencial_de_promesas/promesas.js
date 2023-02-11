// DEFINICION PROMESA ESTANDAR
function login() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

function datosDeUsuario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

// OBJETIVO: (caso especifico)
// ejecutar "datosDeUsuario()"
// solo si "login()" ya termino su ejecucion
// ambas son funciones que retornan PROMESAS


login()
    .then( ()=>{
        // .then() = ejecutar luego
        console.log("usuario autenticado")
        return datosDeUsuario()
    }).then( ()=>{
        // .then() = ejecutar luego
        console.log("datos de usuario OK")
    }).catch( ()=>{
        // .catch() = ejecutar si hay error
        console.log("error")
    });

