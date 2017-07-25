/*jslint esversion: 6, browser: true*/

// Variables to include modules and API key from other JS files
const liri = require('../liri.js');
const keys = require('./keys.js');
// Variable to include modules from Request node package
const request = require('request');

// Variable to hold OMDb's base URL
const url = 'http://www.omdbapi.com/?';
// Function to return OMDb request
function getMovieInfo(command, search) {
  // OMDb search parameters
  let qs = {
    t: (search ? search : search = 'Mr. Nobody'),
    plot: 'short',
    apikey: keys.omdbKey
  };
  request.get({url:url, qs:qs, json:true}, function (error, response, body) {
    // Call Liri function if there is an error with the request
    if (error) {
      return liri.printError(error);
    }
    // If error key exists, log no movie found
    if (body.Error) {
      return console.error(body.Error);
    }
    // Format movie object for screen logging
    let screenResults =
      '\n' +
      liri.bold.red('Title: ') + liri.bold(body.Title) + '\n' +
      liri.bold.red('Year: ') + liri.under(body.Year) + '\n' +
      liri.bold.red('IMDB Rating: ') + body.imdbRating + '\n' +
      // Check if Rotten Tomatoes info is present
      liri.bold.red('Rotten Tomatoes Rating: ') + (body.Ratings[1] ? body.Ratings[1].Value : '--') + '\n' +
      liri.bold.red('Country: ') + body.Country + '\n' +
      liri.bold.red('Language: ') + body.Language + '\n' +
      liri.bold.red('Plot: ') + body.Plot + '\n' +
      liri.bold.red('Actors: ') + body.Actors + '\n';
    console.log(screenResults);
    // Format movie object for file logging
    let fileResults =
      '\n' +
      'Title: ' + body.Title + '\n' +
      'Year: ' + body.Year + '\n' +
      'IMDB Rating: ' + body.imdbRating + '\n' +
      'Rotten Tomatoes Rating: ' + (body.Ratings[1] ? body.Ratings[1].Value : '--') + '\n' +
      'Country: ' + body.Country + '\n' +
      'Language: ' + body.Language + '\n' +
      'Plot: ' + body.Plot + '\n' +
      'Actors: ' + body.Actors + '\n';
    // Call Liri function to append header to log file
    liri.searchHeader(command, search);
    // Call Liri function to append results to log file
    liri.logResults(fileResults);
  });
}

// Export function for use in main JS file
module.exports.getMovieInfo = getMovieInfo;
