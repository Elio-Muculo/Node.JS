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
const date_fns_1 = require("date-fns");
const { v4: uuid } = require('uuid');
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const logEvents = (message, logName) => __awaiter(void 0, void 0, void 0, function* () {
    const datetime = `${(0, date_fns_1.format)(new Date(), 'dd-mm-yyyy\tHH:mm:ss')}`;
    const logItem = `${datetime} \t ${uuid()} \t ${message} \n`;
    console.log(logItem);
    console.log(__filename);
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '/log'))) {
            // TODO why is only creating folder on dist and not on my src Typescript project?
            promises_1.default.mkdir(path_1.default.join(__dirname, '/log'));
        }
        yield promises_1.default.appendFile(path_1.default.join(__dirname, '/log', logName), logItem);
    }
    catch (error) {
        console.error(error);
    }
});
module.exports.log = logEvents;
