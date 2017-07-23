/*jslint esversion: 6, browser: true*/

const twitter = require('./js/twitter.js');
const spotify = require('./js/spotify.js');
const omdb = require('./js/omdb.js');
const file = require('./js/file.js');
const fs = require('fs');
const chalk = require('chalk');
let source = process.argv[2]; // Source for search request
let searchTerm = process.argv.slice(3).join(' '); // Search term used for source (search term not used for twitter)
exports.bold = chalk.bold; // Styling variables
exports.underline = chalk.underline;

// Function to console log error messages
function printError(error) {
  console.error(error.message);
}

function runProgram(src, term) {
  switch (src) {
    case 'my-tweets':
      twitter.getTweets();
      break;
    case 'spotify-this-song':
      spotify.getSongInfo(term);
      break;
    case 'movie-this':
      omdb.getMovieInfo(term);
      break;
    case 'do-what-it-says':
      file.getTextInfo();
      break;
    default:
      console.log('Not a valid command. Please try again.');
  }
}

function logResults(results) {
  fs.appendFile('log.txt', results, function (error) {
    if (error) {
      return printError(error);
    }
  });
}

runProgram(source, searchTerm);

module.exports.printError = printError;
module.exports.runProgram = runProgram;
module.exports.logResults = logResults;
