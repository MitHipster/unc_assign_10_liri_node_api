/*jslint esversion: 6, browser: true*/

// Variables to include modules and API key from other JS files
const liri = require('../liri.js');
const keys = require('./keys.js');
// Variable to include modules from Twitter and Moment node packages
const Twitter = require('twitter');
const moment = require('moment');
const params = {
  screen_name: 'BootyMcBootCamp',
  count: 20
};

// Construct a new Twitter object with API keys
let request = new Twitter(keys.twitterKeys);
// Function to return Twitter request
function getTweets(command) {
  request.get('statuses/user_timeline', params, function (error, tweets, response) {
    // Call Liri function if there is an error with the request
    if (error) {
      return liri.printError(error[0]);
    }
    // Log Twitter screen name
    console.log(
      '\n' +
      liri.bold.cyan('Screen Name: ') + liri.bold(tweets[0].user.screen_name)
    );
    // Call Liri function to append header to log file
    liri.searchHeader(command);
    let dateTime = '';
    // Iterate over tweets and format for screen logging
    tweets.forEach(function (tweet) {
      dateTime = moment(tweet.created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format('dddd, MMMM Do YYYY, h:mmA');
      let screenResults =
        '\n' +
        liri.bold.cyan('Tweet: ') + liri.bold(tweet.text) + '\n' +
        liri.bold.cyan('Posted: ') + dateTime + '\n';
      console.log(screenResults);
      // Format tweets object for file logging
      let fileResults =
        '\n' +
        'Tweet: ' + tweet.text + '\n' +
        'Posted: ' + dateTime + '\n';
      // Call Liri function to append results to log file
      liri.logResults(fileResults);
    });
  });
}

// Export function for use in main JS file
module.exports.getTweets = getTweets;
