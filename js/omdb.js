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
      liri.printError(error);
    } else {
      console.log(body);
    }
  });
}

module.exports.getMovieInfo = getMovieInfo;
