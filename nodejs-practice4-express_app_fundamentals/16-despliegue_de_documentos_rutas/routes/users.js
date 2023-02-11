var express = require('express');
var router = express.Router();

function sumar(){
  return 1+1;
}

router.get('/', function(req, res, next) {

  if(sumar() === 3) { // causa del error
    res.send('respond with a resource');
  } else {
    // notificar error del sistema, cargando una plantilla de error
    // (si no lo hacemos, la web no carga)
    res.status(500);
    res.render("error");
  }
});

module.exports = router;
