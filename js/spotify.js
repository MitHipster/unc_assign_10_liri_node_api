/*jslint esversion: 6, browser: true*/

// Variables to include modules and API key from other JS files
const liri = require('../liri.js');
const keys = require('./keys.js');
// Variable to include modules from Spotify API node package
const Spotify = require('node-spotify-api');

// Construct a new Spotify object with API keys
let request = new Spotify(keys.spotifyKeys);
// Function to return Spotify request
function getSongInfo(command, search) {
  request.search({
    // Spotify search parameters
    type: 'track',
    query: (search ? search : search = 'The Sign'),
    limit: 10
  }, function (error, response) {
    // Call Liri function if there is an error with the request
    if (error) {
      return liri.printError(error);
    }
    // If total is zero, log no song found
    if (response.tracks.total === 0) {
      console.log('Song not found!');
    }
    // Call Liri function to append header to log file
    liri.searchHeader(command, search);
    let items = response.tracks.items;
    // Iterate over tracks and format for screen logging
    items.forEach(function (item) {
      let screenResults =
        '\n' +
        liri.bold.green('Artist(s): ') + liri.bold(item.artists[0].name) + '\n' +
        liri.bold.green('Song Title: ') + liri.under(item.name) + '\n' +
        liri.bold.green('Preview: ') + item.preview_url + '\n' +
        liri.bold.green('Album: ') + item.album.name + '\n';
      console.log(screenResults);
      // Format tracks object for file logging
      let fileResults =
        '\n' +
        'Artist(s): ' + item.artists[0].name + '\n' +
        'Song Title: ' + item.name + '\n' +
        'Preview: ' + item.preview_url + '\n' +
        'Album: ' + item.album.name + '\n';
      // Call Liri function to append results to log file
      liri.logResults(fileResults);
    });
  });
}

// Export function for use in main JS file
module.exports.getSongInfo = getSongInfo;
