const fs = require('fs');
const path = require('path');

// Define the file paths
const sourcePotJson = path.join(__dirname, '../pot.json');
const destPotJson = path.join(__dirname, '../../../pot.json');
const sourcePogen = path.join(__dirname, '../pogen.js');
const destPogen = path.join(__dirname, '../../../pogen.js');

// Check if pot.json already exists at the destination
if (!fs.existsSync(destPotJson)) {
    // If it doesn't exist, copy the file
    fs.copyFileSync(sourcePotJson, destPotJson);
    console.log('pot.json copied to the project root.');
} else {
    // If it already exists, show a message
    console.log('pot.json already exists in the project root. No action taken.');
}

// Check if Pogen.js already exists at the destination
if (!fs.existsSync(destPogen)) {
    // If it doesn't exist, copy the file
    fs.copyFileSync(sourcePogen, destPogen);
    console.log('pogen.js copied to the project root.');
} else {
    // If it already exists, show a message
    console.log('pogen.js already exists in the project root. No action taken.');
}