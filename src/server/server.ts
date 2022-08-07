const { log } = require("./../events/events");

import http from "http";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import EventEmitter from "events";

class MyEmitter extends EventEmitter {}



// inicializar o objecto emitter
const myEmitter: EventEmitter = new MyEmitter();

// add listen for the log event
myEmitter.on("log", (msg: string, fileName: string) => {
  log(msg, fileName);
});

const port = process.env.PORT || 3500;

const serverFile = async (
  filePath: string,
  contentType: string,
  response: http.ServerResponse
) => {
  try {
    const rawData = await fsPromises.readFile(
        filePath,
        !contentType.includes('images')
        ? 'utf8' 
        : 'utf8'
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;

    response
      .writeHead(
        filePath.includes('404.html') ? 404 : 200, 
        { "content-Type": contentType })
      .end(contentType === "application/json" ? JSON.stringify(data) : data);
  } catch (err) {
        myEmitter.emit("log", `${err.name}\t${err.message}\n`, "errLog.txt");
    response.statusCode = 500;
    response.end(); 
  }
};

const server: http.Server = http.createServer((req, res) => {
    myEmitter.emit("log", `${req.url}\t${req.method}\n`, 'reqLog.txt');

  let extension;
  if (req.url != null) {
    extension = path.extname(req.url);
  }

  let contentType: string;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".php":
      contentType = "application/php";
      break;
    default:
      contentType = "text/html";
      break;
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url?.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html" && req.url != null
      ? path.join(__dirname, "views", req?.url)
      : path.join(__dirname, req.url!);

  // makes the .html on browser not required // index | about
  if (!extension && req.url?.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    // serve the file
    serverFile(filePath, contentType, res);
  } else {
    // 404 - not found
    // 301 - redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" }).end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" }).end();
      default:
        serverFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        break;
    }
  }
});

server.listen(port, () => console.log(`server running on port ${port}`));



