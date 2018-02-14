/*jslint esversion: 6, browser: true*/

// Require dotenv to create environment variables
require('dotenv').config();

// variables to include modules from other JS files
const twitter = require('./js/twitter.js');
const spotify = require('./js/spotify.js');
const omdb = require('./js/omdb.js');
const file = require('./js/file.js');
// variables to include modules from other node packages
const inquirer = require("inquirer");
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
 // Command used to issue request. Commands array holds all request options used by Inquirer node
let command;
let commands = [
  'spotify-a-song',
  'omdb-a-movie',
  'show-my-tweets',
  'run-file-command',
  'cancel'
];
// Search used for Spotify and OMDb commands
let search;
// Export chalk stying methods for use in other JS files
exports.bold = chalk.bold; // Styling variables
exports.under = chalk.underline;

// Prompt for user command and search term if applicable
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

// Function to determine which command function to call based on the user's selection
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

// Function to generate a header at the top of each section in the log text file
function searchHeader(cmd, term) {
  let searchHeader =
    '\n' +
    'Command: ' + cmd + ' | ' +
    'Search Term: ' + (term ? term : 'N/A') + ' | ' +
    'Run Time: ' + moment().format('dddd, MMMM Do YYYY, h:mmA ZZ') + '\n';
  logResults(searchHeader);
}
// Function to append the results after the header
function logResults(results) {
  fs.appendFile('log.txt', results, function (error) {
    if (error) {
      return printError(error);
    }
  });
}

// Exports functions for use in other JS files
module.exports.printError = printError;
module.exports.runProgram = runProgram;
module.exports.searchHeader = searchHeader;
module.exports.logResults = logResults;
