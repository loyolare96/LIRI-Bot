require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var SpotifyNode = require('node-spotify-api');
var request = require('request');
const fs = require('fs');


var spotify = new SpotifyNode(keys.spotify);
var client = new Twitter(keys.twitter);

module.exports = keys.twitter;
module.exports = keys.spotify;

if (process.argv[2] == "my-tweets") {
    client.get("statuses/user_timeline", "user_id=968921129921335297", function (error, tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            if (error) throw error;
            console.log("At " + tweets[i].created_at + ": '" + tweets[i].text + "'" + "\n");
        }
    });
    fs.appendFile('log.txt', process.argv[2] + "\n", (err) => {
        if (err) throw err;
    });
}
else if (process.argv[2] == "spotify-this-song") {
    spotify.search({ type: 'track', query: process.argv[3], limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items["0"].album.artists["0"].name)
        console.log("Track name: " + data.tracks.items["0"].name)
        console.log("Album: " + data.tracks.items["0"].album.name)
        if (data.tracks.items["0"].preview_url != null) {
            console.log("Preview URL: " + data.tracks.items["0"].preview_url);
        }
    });
    fs.appendFile('log.txt', process.argv[2] + "\n", (err) => {
        if (err) throw err;
    });
}
else if (process.argv[2] == "movie-this") {
    request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Released)
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings["1"].Value)
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
    fs.appendFile('log.txt', process.argv[2] + "\n", (err) => {
        if (err) throw err;
    });

}
else if (process.argv[2] == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, response) {
        if (error) {
            return console.log(error);
        }
        var newData = response.split(",");

        spotify.search({ type: 'track', query: newData[1], limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items["0"].album.artists["0"].name)
            console.log("Track name: " + data.tracks.items["0"].name)
            console.log("Album: " + data.tracks.items["0"].album.name)
            if (data.tracks.items["0"].preview_url != null) {
                console.log("Preview URL: " + data.tracks.items["0"].preview_url);
            }
        });
    });
    fs.appendFile('log.txt', process.argv[2] + "\n", (err) => {
        if (err) throw err;
    });
}