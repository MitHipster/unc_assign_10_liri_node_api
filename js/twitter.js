/*jslint esversion: 6, browser: true*/

const Twitter = require('twitter');
const moment = require('moment');
const liri = require('../liri.js');
const keys = require('./keys.js');
const params = {
  screen_name: 'BootyMcBootCamp',
  count: 20
};

let request = new Twitter(keys.twitterKeys);

function getTweets(command) {
  request.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return liri.printError(error[0]);
    }
    console.log(
      '\n' +
      liri.bold.cyan('Screen Name: ') + liri.bold(tweets[0].user.screen_name)
    );
    liri.searchHeader(command);
    let dateTime = '';
    tweets.forEach(function (tweet) {
      dateTime = moment(tweet.created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format('dddd, MMMM Do YYYY, h:mmA');
      let screenResults =
        '\n' +
        liri.bold.cyan('Tweet: ') + liri.bold(tweet.text) + '\n' +
        liri.bold.cyan('Posted: ') + dateTime + '\n';
      console.log(screenResults);
      let fileResults =
        '\n' +
        'Tweet: ' + tweet.text + '\n' +
        'Posted: ' + dateTime + '\n';
      liri.logResults(fileResults);
    });
  });
}

module.exports.getTweets = getTweets;
