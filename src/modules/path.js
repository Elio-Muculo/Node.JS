const path = require('path');

// apenas o nome do arquivo atual
console.log(path.basename(__filename, '.js'));

// nome do diretorio actual
console.log(path.dirname(__filename));

// pegar extensao do arquivo
console.log(path.extname(__filename));


// __filename armazena nosso ficheiro atual
console.log(__filename);

__dirname //  armazena nosso diretorio atual

// objecto para criar objecto do nosso ficheiro
console.log(path.parse(__filename));

// juntar caminhos de arquivos
console.log(path.join(__dirname, "test", "test.js"));


