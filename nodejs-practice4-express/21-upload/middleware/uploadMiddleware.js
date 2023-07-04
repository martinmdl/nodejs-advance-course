// multer y path -> librerias necesarias para manejar el archivos subido por el user
const multer = require("multer");
var path = require("path");

// clase que asignara una extension al nombre del archivo de manera automatica
const extension = require("../classes/MimeTypes");

// opciones de guardado del archivo
var storage = multer.diskStorage({

  // destino
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public/done"));
  },

  // nombre
  filename: function (req, file, cb) {
    const ext = new extension();
    cb(
      null,
      file.fieldname + "-" + Date.now() + ext.getExtension(file.mimetype)
    );
  }
});

const upload = multer({

  // limits = tamaño maximo
  limits: {
    fileSize: 4 * 1024 * 1024
  },

  // destino
  dest: path.join(__dirname, "../", "public"),

  // info de guardado
  storage: storage
});

module.exports = upload;
