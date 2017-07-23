/*jslint esversion: 6, browser: true*/

const fs = require('fs');
const liri = require('../liri.js');

function getTextInfo() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return liri.printError(error);
    }
    data = data.split(',');
    let source = data[0].trim();
    if (source === 'do-what-it-says') {
      return console.log('What are you trying to do...create an infinite loop?!');
    }
    let searchTerm = (data[1] ? data[1].trim() : '');
    console.log(source, searchTerm);
    liri.runProgram(source, searchTerm);
  });
}

module.exports.getTextInfo = getTextInfo;
