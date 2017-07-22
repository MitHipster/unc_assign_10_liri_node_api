/*jslint esversion: 6, browser: true*/

const Spotify = require('node-spotify-api');
const liri = require('../liri.js');
const keys = require('./keys.js');

let request = new Spotify(keys.spotifyKeys);

function getSongInfo(searchTerm) {
  request.search({
    type: 'track',
    query: searchTerm,
    limit: 20
  }, function (error, response) {
    if (error) {
      // liri.printError(error[0]);
      console.error(error);
    } else {
      console.dir(response.tracks.items[0]);
    }
  });
}

module.exports.getSongInfo = getSongInfo;
