/*jslint esversion: 6, browser: true*/

const twitter = require('./js/twitter.js');
const spotify = require('./js/spotify.js');
const omdb = require('./js/omdb.js');
const chalk = require('chalk');
let source = process.argv[2]; // Source for search request
let searchTerm = process.argv.slice(3).join(' '); // Search term used for source (search term not used for twitter)
exports.tweet = chalk.cyan.bold; // Styling variables
exports.song = chalk.green.bold;
exports.movie = chalk.red.bold;
exports.bold = chalk.bold;
exports.under = chalk.underline;

// Function to console log error messages
function printError(error) {
  console.error(error.message);
}

switch (source) {
  case 'my-tweets':
    twitter.getTweets();
    break;
  case 'spotify-this-song':
    spotify.getSongInfo(searchTerm);
    break;
  case 'movie-this':
    omdb.getMovieInfo(searchTerm);
    break;
  default:
    console.log('Not a valid source. Please try again.');
}

module.exports.printError = printError;
