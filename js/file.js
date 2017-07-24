/*jslint esversion: 6, browser: true*/

const fs = require('fs');
const liri = require('../liri.js');

function getTextInfo() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return liri.printError(error);
    }
    data = data.split(',');
    let command = data[0].trim();
    if (command === 'do-what-it-says') {
      return console.log('What are you trying to do...create an infinite loop?!');
    }
    let search = (data[1] ? data[1].trim() : '');
    console.log(command, search);
    liri.runProgram(command, search);
  });
}

module.exports.getTextInfo = getTextInfo;
