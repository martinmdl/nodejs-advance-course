const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    switch(req.url){ // .url = localhost<url>
        case '/': // en la raiz
            plantilla = "inicio.html";
            break;

        case '/nodejs': // en localhost:3000/nodejs
            plantilla = "sobrenode.html";
            break;

        default: // si no es ninguna de las url de arriba
            plantilla = "404.html";
            break;
    }

    fs.readFile("./plantillas/" + plantilla, function(err, data) {
        res.write(data);
        res.end();
    });

}).listen(3000, 'localhost');

console.log('SERVER FUNCIONANDO');