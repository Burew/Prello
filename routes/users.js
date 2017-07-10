var express = require('express');
var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('literally nothing to see here');
});

//create new user
router.post('/', function(req, res) { 
	var newUser = new User(
		req.body //{title: req.body.title}
	);
	newUser.save(function(err, user){
		if(err){
			console.log(err);
		} else {
			res.json(user);
		}
	});
});

//user login
router.post('/confirm', function(req, res) { 
	User.findOne({ username: req.body.username }, function(err, user) {
		if (!user) {
			res.render('index',{title: 'Prello' , 
								style:'stylesheets/singleBoardStylesheet.css', 
								error: 'Username does not exist' });
			
		} else {
			if (req.body.username === user.username && req.body.password === user.password) {
				req.session.user = user;
				res.render('prelloDashboard', { title: 'DashBoard'});
				} else {
				res.render('index',{title: 'Prello' , 
								style:'stylesheets/singleBoardStylesheet.css', 
								error: 'Invalid email or password, please try again' });
			}
		}
	});
});
	
//user logout
router.post('/logout', function(req, res) {
	if (req.session){ 
		req.session.reset();
	}
	res.redirect("/");
});

module.exports = router;
