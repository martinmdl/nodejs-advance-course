// librerias
const fs = require("fs");
const util = require("util"); // callback a promesa

// // CALLBACK
// // NO INFORMA ERROR
// fs.writeFile("./archivos/archivo.txt", "12345678" , ()=>{
//     console.log("ok")
// });

// util.promisify
// "fs.writeFile" formato CALLBACK a formato PROMESA
const writeFilePromesa = util.promisify(fs.writeFile);

// PROMESA
// SI INFORMA ERROR
writeFilePromesa("./archivos/archivo.txt", "12345678")
    .then( ()=>{console.log("ok")})
    .catch( ()=>{console.log("error")});