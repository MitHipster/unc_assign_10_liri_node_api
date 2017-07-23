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
      console.log(
        '\n' +
        liri.song('Artist(s): ') + liri.bold(item.artists[0].name) + '\n' +
        liri.song('Song Title: ') + liri.under(item.name) + '\n' +
        liri.song('Preview: ') + item.preview_url + '\n' +
        liri.song('Album: ') + item.album.name + '\n'
      );
    });
  });
}

module.exports.getSongInfo = getSongInfo;
