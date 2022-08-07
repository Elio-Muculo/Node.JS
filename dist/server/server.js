"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { log } = require("./../events/events");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const events_1 = __importDefault(require("events"));
class MyEmitter extends events_1.default {
}
// inicializar o objecto emitter
const myEmitter = new MyEmitter();
// add listen for the log event
myEmitter.on("log", (msg, fileName) => {
    log(msg, fileName);
});
const port = process.env.PORT || 3500;
const serverFile = (filePath, contentType, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawData = yield promises_1.default.readFile(filePath, !contentType.includes('images')
            ? 'utf8'
            : 'utf8');
        const data = contentType === "application/json" ? JSON.parse(rawData) : rawData;
        response
            .writeHead(filePath.includes('404.html') ? 404 : 200, { "content-Type": contentType })
            .end(contentType === "application/json" ? JSON.stringify(data) : data);
    }
    catch (err) {
        myEmitter.emit("log", `${err.name}\t${err.message}\n`, "errLog.txt");
        response.statusCode = 500;
        response.end();
    }
});
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    myEmitter.emit("log", `${req.url}\t${req.method}\n`, 'reqLog.txt');
    let extension;
    if (req.url != null) {
        extension = path_1.default.extname(req.url);
    }
    let contentType;
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
    let filePath = contentType === "text/html" && req.url === "/"
        ? path_1.default.join(__dirname, "views", "index.html")
        : contentType === "text/html" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.slice(-1)) === "/"
            ? path_1.default.join(__dirname, "views", req.url, "index.html")
            : contentType === "text/html" && req.url != null
                ? path_1.default.join(__dirname, "views", req === null || req === void 0 ? void 0 : req.url)
                : path_1.default.join(__dirname, req.url);
    // makes the .html on browser not required // index | about
    if (!extension && ((_b = req.url) === null || _b === void 0 ? void 0 : _b.slice(-1)) !== "/")
        filePath += ".html";
    const fileExists = fs_1.default.existsSync(filePath);
    if (fileExists) {
        // serve the file
        serverFile(filePath, contentType, res);
    }
    else {
        // 404 - not found
        // 301 - redirect
        switch (path_1.default.parse(filePath).base) {
            case "old-page.html":
                res.writeHead(301, { Location: "/new-page.html" }).end();
                break;
            case "www-page.html":
                res.writeHead(301, { Location: "/" }).end();
            default:
                serverFile(path_1.default.join(__dirname, "views", "404.html"), "text/html", res);
                break;
        }
    }
});
server.listen(port, () => console.log(`server running on port ${port}`));
