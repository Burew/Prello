var mongoose = require('mongoose');
var listSchema = require('./listSchema');

var Board = mongoose.model('Board', {
	title: String,
	list: [listSchema],
	author: String,//mongoose.Schema.Types.ObjectId,
	users : [String]
	/* userIDs: [mongoose.Schema.Types.ObjectId] */
});

module.exports = Board; 	
