require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var SpotifyNode = require('node-spotify-api');
var request = require('request');


var spotify = new SpotifyNode(keys.spotify);
var client = new Twitter(keys.twitter);

module.exports = keys.twitter;
module.exports = keys.spotify;

function tweetSearch() {
    var twitterURL = "https://api.twitter.com/1.1/search/tweets.json?q=rankouOTN%20&src=typd";

    console.log(twitterURL);
}
if (process.argv[2] == "my-tweets") {
    tweetSearch();
    client.get("statuses/user_timeline", "user_id=968921129921335297", function (error, tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            if (error) throw error;
            console.log("At " + tweets[i].created_at + ": '" + tweets[i].text + "'" + "\n");
        }
    });
}