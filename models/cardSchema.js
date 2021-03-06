var mongoose = require('mongoose');

var card = new mongoose.Schema({ //has to be schema for a card`
	title: String,
	description: String,
	labels: Array,
	author: String,
	comments: Array //object{author, comment, dateTime}
});

module.exports = card;