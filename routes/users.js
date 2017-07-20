var express = require('express');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    User.find({}, function (err, users) {
        if (err) return console.error(err);
        res.json(users);
    });
});

//create new user
router.post('/', function(req, res) { 
	var newUser = new User(
		// req.body //{title: req.body.title}
		{
		    "username" : req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "boardIDs": [],
            "token" : null //User.generateUniqueToken(req.body.email)
		}
	);

	//password will be before saving hashed here
	newUser.save(function(err, user){
		if(err){
			console.log(err);
		} else {
            res.redirect('/board/dashboard');
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
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log('check hash password:', isMatch); //Password123: true

				if (isMatch){
                    req.session.user = user;
                    res.redirect('/board/dashboard');
				}else {
                    res.render('index', {title: 'Prello',
                        style:'stylesheets/singleBoardStylesheet.css',
                        error: 'Invalid password for Username: ' + req.body.username + ', please try again' });
                }
            });
		}
	});
});

//password reset request
router.post('/resetPasswordHome', function(req, res) {
	//check if email in database, redir to reset pswd page if successful
    User.findOne({ email: req.body.email }, function(err, user) {
	if (user){

        //set token for users that want to reset pswd
        user.token = User.generateUniqueToken(req.body.email);

        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                res.render('resetPasswordLink',
                    {
                        title: 'Password Reset Link',
                        customUserLink: '/users/resetPasswordLink/' + user.token
                    });
            }
        });
	}
	else {
		//else render an error message
		res.render('resetPasswordHome', { title: 'Dashboard', error: 'Email does not exist'});
    }
    });
});

//password reset link
router.post('/resetPasswordLink/:token', function(req, res) {
    //check if token in database, redir to reset pswd page if successful
    User.findOne({ token: req.params.token }, function(err, user) {
        if (user){
            res.render('resetPasswordForm', {title: 'Password Reset Link', token: user.token});
        } else {
            res.render('resetPasswordHome', { title: 'Dashboard', error: 'Invalid link'});
		}
    });


});

//password reset form
router.post('/resetPasswordConfirm', function(req, res) {
    User.findOne({ token: req.body.token }, function(err, user) {
        if (user){
            //invalidate the token link
            user.token = null;

			//save user w/ new password, hashed
			user.password = req.body.newPassword;
			user.save(function(err, newBoard){
                if(err){
                    console.log(err);
                } else {
                    res.render('index', { title: 'Prello', error:'Password reset successfully'});
                }
            });
        } else {
            res.redirect("/");
        }
    });
});

//delete user
router.delete('/:userID', function(req, res) {
    User.findOne({_id: req.params.userID}, function (err, user) {
        if (err)
            return console.error(err);
        if (user == null){
            res.end();
            return;
        }
        user.remove();
    });
    res.end();
});

// //user logout
// router.post('/logout', function(req, res) {
// 	if (req.session){
// 		req.session.reset();
// 	}
// 	res.redirect("/");
// });

module.exports = router;
