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
    console.log(
      '\n' +
      liri.movie('Title: ') + liri.bold(body.Title) + '\n' +
      liri.movie('Year: ') + body.Year + '\n' +
      liri.movie('IMDB Rating: ') + body.imdbRating + '\n' +
      liri.movie('Rotten Tomatoes Rating: ') + body.Ratings[1].Value + '\n' +
      liri.movie('Country: ') + body.Country + '\n' +
      liri.movie('Language: ') + body.Language + '\n' +
      liri.movie('Plot: ') + body.Plot + '\n' +
      liri.movie('Actors: ') + body.Actors + '\n'
    );
  });
}

module.exports.getMovieInfo = getMovieInfo;
