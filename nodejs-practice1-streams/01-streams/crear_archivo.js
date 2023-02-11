const fs = require('fs');
const file = fs.createWriteStream('archivo.txt');

for(let i = 0; i <= 1e6; i++) { // 1e6 = 1.000.000
  file.write('Ut nisi ullamco pariatur id consequat laborum ad adipisicing aliqua in magna ut.')
}

file.end();