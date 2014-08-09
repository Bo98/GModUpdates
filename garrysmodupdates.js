var Twit = require('twit');
var twitter = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var express = require('express');
var app = express();
app.get('/', function(req, res) {
	res.send('Hello there.');
});
app.listen(5000);

var userstream = twitter.stream('statuses/filter', {follow: 'FacepunchBot', track: '(GarrysMod/main)'});
userstream.on('tweet', function(tweet) {
	console.log('Received tweet: id ' + tweet.id_str + ', screen_name ' + tweet.user.screen_name);
	if (tweet.user.screen_name === "FacepunchBot") {
		retweet(tweet.id_str);
	}
});

var retweet = function(idStr) {
	twitter.post('statuses/retweet/:id', {id: idStr}, function() {});
};