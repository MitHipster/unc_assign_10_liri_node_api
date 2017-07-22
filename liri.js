/*jslint esversion: 6, browser: true*/

const twitter = require('./js/twitter.js');
const spotify = require('./js/spotify.js');
let source = process.argv[2]; // Source for search request
let searchTerm = process.argv[3]; // Search term used for source (search term not used twitter)

// Function to console log error messages
function printError(error) {
  console.error(error.message);
}

switch (source) {
  case 'my-tweets':
    twitter.getTweets();
    break;
  case 'spotify-this-song':
    console.log(source);
    console.log(searchTerm);
    spotify.getSongInfo(searchTerm);
    break;
  default:
    console.log('Not a valid source. Please try again.');
}

module.exports.printError = printError;
