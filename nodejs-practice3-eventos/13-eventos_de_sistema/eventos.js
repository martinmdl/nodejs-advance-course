const https = require('https');

// ".on" = asigno codigo al momento en el que se activa un evento

const req = https.get('https://en.wikipedia.org/w/api.php?action=help&format=json', (res) => {
    
    // "data" = se activa cuando recibimos un bloque de datos
    res.on('data', (data) => {console.log("... recibiendo datos");});

    // "end" = se activa cuando termina el proceso
    res.on('end', (data) => {console.log("termina http");});

});

// "socket" = se activa cuando se inicializa nuestra conexion
req.on("socket", (data) => {console.log("inicia http");});

// "error" = se actuva cuando se detecta un error
req.on('error', (data) => {console.log("error");});



