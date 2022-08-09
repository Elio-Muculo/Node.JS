
const fs = require("fs");
const fspromises = require("fs").promises;
const path = require("path");

require('./test/stream')


const fileOps =  async () => {
    try {
        // ? we dont need the callback here bcause using  promises
        // read from a file
        const data = await fspromises.readFile(
          path.join(__dirname, "/test", 'EllioName.txt'),
        );

        // deleting a file
        await fspromises.unlink(path.join(__dirname, '/test', 'EllioName.txt'))

        // write to a new file
        await fspromises.writeFile(
          path.join(__dirname, "/test", "Name.txt"),
          data,
        );

        // add more content to a file
        await fspromises.appendFile(
            path.join(__dirname, "/test", "Name.txt"),
            '\n\n Nice to meet you, elliot',
        );

        // rename to a new name
        await fspromises.rename(
          path.join(__dirname, "/test", "Name.txt"),
          path.join(__dirname, "/test", "Name2.txt"),
        );

        // finally, read the new file
        const Newdata = await fspromises.readFile(
            path.join(__dirname, "/test", "Name2.txt"),
            'utf-8'
        );

        console.log(Newdata);
    } catch (error) {
        console.log(error);
    }    
}
// fileOps();


// ? create folder if not exists
if (!fs.existsSync('./makdir')) {
    fs.mkdir("./makdir", (err) => {
        if (err) throw err;

        console.log("folder created...");
    });
}


// ? remove folder if exists
if (fs.existsSync("./makdir")) {
  fs.rmdir("./makdir", (err) => {
    if (err) throw err;

    console.log("folder created...");
  });
}


// ? copy files folder if exists
if (fs.existsSync("./modules")) {
  fs.cp(path.join(__filename), './mkdir/mk.js', (err) => {
    if (err) console.log(err);
  });
}


// write file

fs.writeFile(path.join(
    __dirname, "/e", "test.html"), 
    'my friend i was busy trying to find you, hope you are good', 
    (err) => {
        if (err) throw err;

        console.log('operation completed..');
});

// read file

fs.readFile(path.join(__dirname, '/e', 'test.html'), 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);
});


process.on('uncaughtException', err => {
    console.error(`there was an error ${err}`);
    process.exit(1);
})


// append file create a file if not exist
fs.appendFile(path.join(
    __dirname, "/e", "text.txt"), 
    'my friend i was busy trying to find you, hope you are good', 
    (err) => {
        if (err) throw err;

        console.log('Append completed..');
});



// ? to write and append more text use promises
// ? creates a callback hell
// ? to avoid use promises 

fs.writeFile(path.join(__dirname, '/test', 'text.txt'), 'hello there', 'utf-8', err => {
    if (err) {
        throw err;
    }

    console.log('writing...')

    fs.appendFile(path.join(__dirname, '/test', 'text.txt'), '\n\nof course im', 'utf-8', err => {
        if (err) throw err;
        console.log('appending...')
        
        fs.appendFile(
        path.join(__dirname, "/test", "text.txt"), "\n\nof course im", "utf-8",
        (err) => {
            if (err) throw err;
            console.log("appending...");
    
            fs.appendFile( path.join(__dirname, "/test", "text.txt"), "\n\nof course im",
            "utf-8",
            (err) => {
                if (err) throw err;

                console.log("appending..."); 
                
                fs.rename(
                path.join(__dirname, "/test", "text.txt"),
                path.join(__dirname, "/test", "textNewName.txt"),
                (err) => {
                    if (err) throw err;

                    console.log("appending...");
                }
                );
            }
            );
        }
        );
    })
});























