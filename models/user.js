var mongoose = require('mongoose');

var User = mongoose.model('User', { //model the list
	username: String,
	email: String,
	password: String,
	boardIDs: Array
});

module.exports = User;