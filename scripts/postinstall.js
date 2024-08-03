const fs = require('fs');
const path = require('path');

// Define the file paths
const sourcePotJson = path.join(__dirname, '../pot.json');
const destPotJson = path.join(__dirname, '../../../pot.json');

// Check if pot.json already exists at the destination
if (!fs.existsSync(destPotJson)) {
    // If it doesn't exist, copy the file
   fs.copyFileSync(sourcePotJson, destPotJson);
   console.log('pot.json copied to the project root.');
} else {
    // If it already exists, show a message
   console.log('pot.json already exists in the project root. No action taken.');
}
