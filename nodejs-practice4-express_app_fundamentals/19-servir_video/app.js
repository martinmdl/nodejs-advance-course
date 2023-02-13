var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");

const fileInfo = promisify(stat);


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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// -----------------------------------------------------------------------------------
// ENVIAR UN VIDEO

// OPCION 1 (VIDEO ESTATICO)
// next = callBack
app.use('/video-static' , (req, res, next) => { 

  // __dirname -> apunta a al directorio base donde se encuentra el proyecto
  // independientemente del directorio actual y del sistema operativo (DINAMICO)
  const fileName = __dirname + "/public/video/video.mp4";

  // content type = aclaro que el archivo es de video
  res.type("video/mp4");
  res.sendFile(fileName);
});

// -----------------------------------------------------------------------------------
// OPCION 2 (STREAM "RIGIDO" -> no se puede adelantar ni atrasar)
app.use("/video-stream",  (req, res, next) => {

  // cuando la ruta no contiene "__dirname" se le dice relativa (al directorio del server)
  const fileName = "./public/video/video.mp4";

  // codigo 200: confirma que tenemos el video.mp4 en el server
  res.writeHead(200, {"Content-Type": "video/mp4"});

  createReadStream(fileName).pipe(res);
});

// -----------------------------------------------------------------------------------
// OPCION 3 (STREAM "ACTUALIZABLE" -> permite adelantar ni atrasar)
app.use("/video-rango", async (req, res, next) => {

  const fileName = "./public/video/video.mp4";
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;

  if(range) { // mostrar video como la OPCION 3

    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      "Content-Type": "video/mp4",
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`
    });

    createReadStream(fileName, { start, end }).pipe(res);

  }else{ // mostar video como la OPCION 2 (STREAM "RIGIDO")

    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": size
    });
  
    createReadStream(fileName).pipe(res);
  }
});

// -----------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
