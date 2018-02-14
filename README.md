# LIRI Bot
UNC Boot Camp Assignment 10 LIRI Node API

LIRI is a Language Interpretation and Recognition Interface. Running LIRI gives you options to get information from OMDB, Spotify, Twitter, or based on a command read from a file. The information will be returned to the console and appended to an output file.

## Instructions
1. Download the repo
2. Open the terminal and navigate to the repo folder
3. Run ```npm intall```
4. Create a ```.env``` file to enter your API Keys

```javascript
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```
5. Run `node liri.js` in the terminal and follow the prompts

## Technology
LIRI Bot was created with the following npm packages:
  * chalk
  * dotenv
  * inquirer
  * moment
  * node-spotify-api
  * request
  * spotify
  * twitter