// // FUNCION CONVENCIONAL SINCRONICA
// function numeroAleatorio() {
//   console.log( Math.floor(Math.random() * 100) );
// }
// numeroAleatorio();

// FUNCION QUE RETORNA UNA PROMESA (ASINCRONICAS)
function numeroAleatorio() {
  // retorna FUNCION PROMESA
  return new Promise((resolve, reject) => {
    // timeout -> tiempo de espera
    // (situacion artificialmente lenta)
    setTimeout(() => {
      resolve( Math.floor(Math.random() * 100) );
    }, 2000);
  });
}

// // LLAMADO PROMESA ALTERNATIVO (async - await)
async function resultado() {
  console.log("resultado invocado");
  const aleatorio = await numeroAleatorio();
  console.log(`Resultado: ${aleatorio}`);
}

resultado();


