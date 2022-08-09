// criar pasta
// criar ficheiro
// mover para la
// mudar nome
// escrever nele
// ler conteudo

import fs from "fs";
import path from "path";

// ? create folder
const mkDir = async (folderName: string) => {
  try {
    if (!fs.existsSync(path.join(__dirname, folderName)))
      fs.mkdir(path.join(__dirname, "dark"), (err) => {
        console.log(`Error: ${err}`);
      });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

// ? create file and write in it

const createFile = async (fileName: string) => {
  fs.writeFile(path.join(__dirname, "dark", fileName), "hello", (err) => {
    if (err) throw err;
  });
};

// ? append file
const writeData = async (data: string) => {
  fs.appendFile(path.join(__dirname, "dark", "texto.txt"), data, (err) => {
    if (err) {
      throw err;
    }
  });
};

// ? move file

const move = async (from: string, to: string) => {
  if (fs.existsSync(from)) {
    fs.cp(from, to, (err) => {
      if (err) throw err;
    });
  }
};

// ? anonymous functions
(async function () {
  await mkDir("dark");
  await createFile("texto.txt");
  await writeData(`\nokay google that's my time now`);
  await writeData(`\nokay google that's my time now`);
  await writeData(`\nokay google that's my time now`);
  await writeData(`\nokay google that's my time now`);
  await move(
    path.join(__dirname, "dark", "texto.txt"),
    path.join(__dirname, "data", "todo.txt")
  );
})();

