// lib requerida para las promesas
const promesasNode = require("fs").promises;

// PROMESAS permiten programar asincronamente
// nos ayuda a la eficiencia y la velocidad de ejecucion
// principalmente en procesos pesados como la modificacion de archivos del server

promesasNode
    .copyFile("./archivos/original.txt" , "./archivos/copia.txt")
    .then(() => console.log("copiado correctamente"))
    .catch(() => console.log("copiado fallo"))
    .finally(() => console.log("proceso finalizado..."));

// todas las lineas siguientes a las 12 van a seguir ejecutandose
// aunque la copia lleve mucho tiempo