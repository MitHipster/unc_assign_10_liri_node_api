/*jslint esversion: 6, browser: true*/

// Variable to include modules from main JS file
const liri = require('../liri.js');
// Variable to include modules from file system node package
const fs = require('fs');
// Function to run command stored in text file
function getTextInfo() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    // Call Liri function if there is an error reading file
    if (error) {
      return liri.printError(error);
    }
    // Add command and search, if applicable, to an array
    data = data.split(',');
    // Store command in a variable
    let command = data[0].trim();
    // If command would create an infinite loop, exit function and log message to screen
    if (command === 'run-file-command') {
      return console.log('What are you trying to do...create an infinite loop?!');
    }
    // Store search term if it exists
    let search = (data[1] ? data[1].trim() : '');
    // Log command and, if exists. search term to the screen, informing user of the job to be run
    console.log(command, search);
    // Call Liri function to determine which job to run
    liri.runProgram(command, search);
  });
}

// Export function for use in main JS file
module.exports.getTextInfo = getTextInfo;
