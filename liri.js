/*jslint esversion: 6, browser: true*/

const twitter = require('./js/twitter.js');
const spotify = require('./js/spotify.js');
const omdb = require('./js/omdb.js');
const file = require('./js/file.js');
const inquirer = require("inquirer");
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
let command; // Command used to issue request
let search; // Search term used for source (search term not used for twitter)
let commands = [
  'spotify-a-song',
  'omdb-a-movie',
  'show-my-tweets',
  'run-file-command',
  'cancel'
];
exports.bold = chalk.bold; // Styling variables
exports.under = chalk.underline;

inquirer.prompt({
  type: "list",
  message: "Hello, this is LIRI. How may I help you?",
  choices: commands,
  name: "command"
}).then(function (answer) {
  command = answer.command;
  if (commands.indexOf(command) <= 1) {
    inquirer.prompt({
      type: "input",
      message: "Enter search (without quotes)",
      name: "search"
    }).then(function (answer) {
      search = answer.search;
      runProgram(command, search);
    });
  } else {
    runProgram(command);
  }
});

// Function to console log error messages
function printError(error) {
  console.error(error.message);
}

function runProgram(cmd, term) {
  switch (cmd) {
    case commands[0]:
      spotify.getSongInfo(cmd, term);
      break;
    case commands[1]:
      omdb.getMovieInfo(cmd, term);
      break;
    case commands[2]:
      twitter.getTweets(cmd);
      break;
    case commands[3]:
      file.getTextInfo();
      break;
    case commands[4]:
      break;
    default:
      console.log('Not a valid command. Please try again.');
  }
}

function searchHeader(cmd, term) {
  let searchHeader =
    '\n' +
    'Command: ' + cmd + ' | ' +
    'Search Term: ' + (term ? term : 'N/A') + ' | ' +
    'Run Time: ' + moment().format('dddd, MMMM Do YYYY, h:mmA ZZ') + '\n';
  logResults(searchHeader);
}

function logResults(results) {
  fs.appendFile('log.txt', results, function (error) {
    if (error) {
      return printError(error);
    }
  });
}

module.exports.printError = printError;
module.exports.runProgram = runProgram;
module.exports.searchHeader = searchHeader;
module.exports.logResults = logResults;
