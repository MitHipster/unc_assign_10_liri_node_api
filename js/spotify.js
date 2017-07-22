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
      liri.printError(error);
    } else {
      let items = response.tracks.items;
      items.forEach(function (item) {
        console.log(
          '\n' +
          'Artist(s): ' + item.artists[0].name + '\n' +
          'Song Title: ' + item.name + '\n' +
          'Preview: ' + item.preview_url + '\n' +
          'Album: ' + item.album.name + '\n'
        );
      });
    }
  });
}

module.exports.getSongInfo = getSongInfo;
