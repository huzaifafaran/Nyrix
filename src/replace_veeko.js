const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'components');
const appFile = path.join(__dirname, 'App.js');
const headerFile = path.join(srcDir, 'Header.js');
const kinluFile = path.join(srcDir, 'Kinlu.js');
const kinluCss = path.join(srcDir, 'Kinlu.css');

// App.js
let app = fs.readFileSync(appFile, 'utf8');
app = app.replace(/import Veeko from '.\/components\/Veeko';/g, "import Kinlu from './components/Kinlu';");
app = app.replace(/<Veeko \/>/g, "<Kinlu />");
fs.writeFileSync(appFile, app, 'utf8');

// Header.js
let header = fs.readFileSync(headerFile, 'utf8');
header = header.replace(/VEEKO/g, "KINLU");
fs.writeFileSync(headerFile, header, 'utf8');

// Kinlu.js
let kinlu = fs.readFileSync(kinluFile, 'utf8');
kinlu = kinlu.replace(/Veeko/g, "Kinlu");
kinlu = kinlu.replace(/veeko/g, "kinlu");
kinlu = kinlu.replace(/VEEKO/g, "KINLU");
kinlu = kinlu.replace(/https:\/\/kinlu\.io/g, "https://kinlu.ai/"); // because veeko.io became kinlu.io with the first replace
fs.writeFileSync(kinluFile, kinlu, 'utf8');

console.log('Kinlu replacements done.');
