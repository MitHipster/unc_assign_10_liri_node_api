/*jslint esversion: 6, browser: true*/

const request = require('request');
const liri = require('../liri.js');
const keys = require('./keys.js');

const url = 'http://www.omdbapi.com/?';

function getMovieInfo(searchTerm) {
  let qs = {
    t: (searchTerm ? searchTerm : 'Mr. Nobody'),
    plot: 'short',
    apikey: keys.omdbKey
  };

  request.get({url:url, qs:qs, json:true}, function (error, response, body) {
    if (error) {
      return liri.printError(error);
    }
    let screenResults =
      '\n' +
      liri.bold.red('Title: ') + liri.bold(body.Title) + '\n' +
      liri.bold.red('Year: ') + body.Year + '\n' +
      liri.bold.red('IMDB Rating: ') + body.imdbRating + '\n' +
      liri.bold.red('Rotten Tomatoes Rating: ') + body.Ratings[1].Value + '\n' +
      liri.bold.red('Country: ') + body.Country + '\n' +
      liri.bold.red('Language: ') + body.Language + '\n' +
      liri.bold.red('Plot: ') + body.Plot + '\n' +
      liri.bold.red('Actors: ') + body.Actors + '\n';
    console.log(screenResults);
    let fileResults =
      '\n' +
      'Title: ' + body.Title + '\n' +
      'Year: ' + body.Year + '\n' +
      'IMDB Rating: ' + body.imdbRating + '\n' +
      'Rotten Tomatoes Rating: ' + body.Ratings[1].Value + '\n' +
      'Country: ' + body.Country + '\n' +
      'Language: ' + body.Language + '\n' +
      'Plot: ' + body.Plot + '\n' +
      'Actors: ' + body.Actors + '\n';
    liri.logResults(fileResults);
  });
}

module.exports.getMovieInfo = getMovieInfo;
