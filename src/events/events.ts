import { format } from 'date-fns';
const { v4: uuid }  = require('uuid');

import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';




const logEvents = async (message: string, logName: string) => {
    const datetime: string = `${format(new Date(), 'dd-mm-yyyy\tHH:mm:ss')}`;
    const logItem: string = `${datetime} \t ${uuid()} \t ${message} \n`;
    
    try {
        if (!fs.existsSync(path.join(__dirname, '/log'))) {
            fsPromises.mkdir(path.join(__dirname, '/log'));
        }

        await fsPromises.appendFile(path.join(__dirname, '/log', logName), logItem);
    } catch (error) {
        console.error(error);
        
    }
}


module.exports.log = logEvents;
