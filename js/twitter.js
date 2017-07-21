/*jslint esversion: 6, browser: true*/
const Twitter = require('twitter');
const keys = require('./keys.js');
const params = {
  screen_name: 'BootyMcBootCamp',
  count: 20
};

let request = new Twitter(keys.twitterKeys);

function getTweets() {
  request.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      console.error(error.message);
    }
    console.log(
      '\n' +
      'Screen Name: ' + tweets[0].user.screen_name
    );

    tweets.forEach(function (tweet) {
      console.log(
        '\n' +
        'Tweet: ' + tweet.text + '\n' +
        'Posted: ' + tweet.created_at + '\n'
      );
    });
  });
}

module.exports.getTweets = getTweets;
