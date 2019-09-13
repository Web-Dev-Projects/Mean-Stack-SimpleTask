const fs = require('fs')
const path = require('path')


const isDirectory = source => fs.lstatSync(source).isDirectory();
const isFile = source => fs.lstatSync(source).isFile();

const getFiles = (source, filter) =>
    fs.readdirSync(source).map(name => path.join(source, name)).filter(filter);

let files = []

getFiles('./tmp', isDirectory).forEach(path => {
    files += getFiles(path, isFile);
})

console.log(files)