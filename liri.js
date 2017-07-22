/*jslint esversion: 6, browser: true*/

const source = process.argv[2]; // Source for search request
const searchTerm = process.argv[3]; // Search term used for source (search term not used twitter)
const twitter = require('./js/twitter.js');

// Function to console log error messages
function printError(error) {
  console.error(error.message);
}

switch (source) {
  case 'my-tweets':
    twitter.getTweets();
    break;
  default:
    console.log('Not a valid source. Please try again.');
}

module.exports.printError = printError;
