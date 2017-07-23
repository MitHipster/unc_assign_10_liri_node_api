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

function getTweets() {
  request.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return liri.printError(error[0]);
    }
    console.log(
      '\n' +
      liri.tweet('Screen Name: ') + liri.bold(tweets[0].user.screen_name)
    );
    let dateTime = '';
    tweets.forEach(function (tweet) {
      dateTime = moment(tweet.created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format('dddd, MMMM Do YYYY, h:mmA');
      console.log(
        '\n' +
        liri.tweet('Tweet: ') + liri.bold(tweet.text) + '\n' +
        liri.tweet('Posted: ') + dateTime + '\n'
      );
    });
  });
}

module.exports.getTweets = getTweets;
