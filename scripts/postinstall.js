const fs = require('fs');
const path = require('path');

// Define the file paths
const sourcePotJson = path.join(__dirname, '../pot.json');
const destPotJson = path.join(__dirname, '../../../pot.json');
const sourceGulpfile = path.join(__dirname, '../gulpfile.js');
const destGulpfile = path.join(__dirname, '../../../gulpfile.js');

// Check if pot.json already exists at the destination
if (!fs.existsSync(destPotJson)) {
    // If it doesn't exist, copy the file
    fs.copyFileSync(sourcePotJson, destPotJson);
    console.log('pot.json copied to the project root.');
} else {
    // If it already exists, show a message
    console.log('pot.json already exists in the project root. No action taken.');
}

// Check if Gulpfile.js already exists at the destination
if (!fs.existsSync(destGulpfile)) {
    // If it doesn't exist, copy the file
    fs.copyFileSync(sourceGulpfile, destGulpfile);
    console.log('Gulpfile.js copied to the project root.');
} else {
    // If it already exists, show a message
    console.log('Gulpfile.js already exists in the project root. No action taken.');
}