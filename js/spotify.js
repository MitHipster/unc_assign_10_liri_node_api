/*jslint esversion: 6, browser: true*/

const Spotify = require('node-spotify-api');
const liri = require('../liri.js');
const keys = require('./keys.js');

let request = new Spotify(keys.spotifyKeys);

function getSongInfo(searchTerm) {
  request.search({
    type: 'track',
    query: (searchTerm ? searchTerm : 'The Sign'),
    limit: 20
  }, function (error, response) {
    if (error) {
      return liri.printError(error);
    }
    let items = response.tracks.items;
    items.forEach(function (item) {
      let screenResults =
        '\n' +
        liri.bold.green('Artist(s): ') + liri.bold(item.artists[0].name) + '\n' +
        liri.bold.green('Song Title: ') + liri.under(item.name) + '\n' +
        liri.bold.green('Preview: ') + item.preview_url + '\n' +
        liri.bold.green('Album: ') + item.album.name + '\n';
      console.log(screenResults);
      let fileResults =
        '\n' +
        'Artist(s): ' + item.artists[0].name + '\n' +
        'Song Title: ' + item.name + '\n' +
        'Preview: ' + item.preview_url + '\n' +
        'Album: ' + item.album.name + '\n';
      liri.logResults(fileResults);
    });
  });
}

module.exports.getSongInfo = getSongInfo;
