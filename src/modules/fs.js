const fs = require('fs');
const path = require('path');

// criar uma pasta
fs.mkdir(path.join(__dirname, '/test'), (error) => {
    // quando criar a pasta me execute (callback)

    if (error)
        return console.log(`Error: ${error}`);
    return console.log('pasta criada com sucesso');
})


fs.mkdir(path.join(__dirname, 'e'), (err) => {
    return err 
        ? console.log(`error: ${err}`) 
        : console.log("sucesso");
});

// criar um arquivo
fs.writeFile(path.join(__dirname, 'e', 'test.html'), 'hello node', (err) => {
  if (err) return console.log(err);
  console.log("arquivo criado com sucesso");

  // adicionar a um arquivo

  fs.appendFile(
    path.join(__dirname, "/e", "test.html"),
    "hello world",
    (err) => {
      return err 
        ? console.log(`error: ${err}`) 
        : console.log("sucesso");
    }
  );

  // ler arquivos
  fs.readFile(
    path.join(__dirname, "/e", "test.html"), 
    "utf-8", 
    (err, data) => {
        return err 
            ? console.log(`error: ${err}`) 
            : console.log(`data: ${data}`);
    }
  );
})







