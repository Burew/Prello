var mongoose = require('mongoose');
var card = require('./cardSchema');

var listSchema = new mongoose.Schema({
	title: String,
	cards: [card]
});

module.exports = listSchema;