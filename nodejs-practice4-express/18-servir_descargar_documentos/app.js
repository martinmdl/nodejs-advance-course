// ARCHIVOS
// todos los archivos dentro de la carpeta "public"
// son visibles para el user desde la web
// agregando al link: nombreArchivo.ext

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// SERVIR ARCHIVOS
// esta linea hace a "public" visible a los users
app.use(express.static(path.join(__dirname, 'public')));
// esta linea hace a "files" visible a los users 
app.use(express.static("files"));

// GENERAR, MOSTRAR Y DESCARGAR ARCHIVOS
// nuevo router en el server ("/:nombre_usuario" -> todo lo que se encuentre dsp de "/descarga")
// se va a transformar en una variable que podemos capturar
app.get("/descarga/:nombre_usuario", (req, res) => {

  // __dirname -> apunta a al directorio base donde se encuentra el proyecto
  // independientemente del directorio actual y del sistema operativo (DINAMICO)
  const streamEscritura = fs.createWriteStream(`${__dirname}/files/text2.txt`);

  // escribo un documento (se almacena en el servidor)
  streamEscritura.write(
    // :nombre_usuario = ${req.params.nombre_usuario}
    `Estimable ${req.params.nombre_usuario}: aquí está el documento que solicitas`,
    () => {

      // // .sendFile -> mostrar el archivo creado
      // res.sendFile(`${__dirname}/files/text2.txt`);

      // .download -> descargar el archivo creado
      res.download(`${__dirname}/files/text2.txt`, error => {
        if (error) {
          console.log("ERROR");
          res.status(404).render("error");
        } else {
          console.log("Descarga OK");
        }
      });
    }
  )
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
