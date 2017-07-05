var mongoose = require('mongoose');
var card = require('./card');

var List = mongoose.model('List', { //model the list
	title: String,
	cards: [card],
	description: String
});

module.exports = List;