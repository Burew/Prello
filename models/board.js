var mongoose = require('mongoose');
var listSchema = require('./listSchema');

var Board = mongoose.model('Board', {
	title: String,
	list: [listSchema],
	userIDs: [String]
});

module.exports = Board; 	
