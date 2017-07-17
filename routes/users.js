var express = require('express');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res) {
  res.send('literally nothing to see here');
}); */

//create new user
router.post('/', function(req, res) { 
	var newUser = new User(
		req.body //{title: req.body.title}
		// {"username" : req.body.username,
        // "email": req.body.email,
        // "password": "",
        // "boardIDs": [] }
	);
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
                    //res.render('prelloDashboard', { title: 'DashBoard', error: ""});
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

//password reset
router.post('/resetPasswordHome', function(req, res) {
	console.log("POST : Password reset page loaded");
	//check if email in database, redir to reset pswd page if successful
    User.findOne({ email: req.body.email }, function(err, user) {
	if (user){

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err)
            	res.render('resetPasswordHome', {title:'Dashboard', error:'error w/ generating salt'});

            // hash the email using our new salt, gets new one each time
            bcrypt.hash(user.email, salt, function(err, hash) {
                if (err)
                    res.render('resetPasswordHome', {title:'Dashboard', error:'error w/ generating hash'});

                console.log("new hash link is: " + hash);
                //send to custom reset password link page
                res.render('resetPasswordLink',
					{
						title: 'Password Reset Link',
						email: user.email,
						customUserLink: '/users/resetPasswordLink/' + hash
					});

            });
        });

	}
	else {
		//else render an error message
		res.render('resetPasswordHome', { title: 'Dashboard', error: 'Email does not exist'});
    }
    });
});

//password reset link
router.post('/resetPasswordLink/:hash', function(req, res) {
    console.log("\nPOST : Password reset link loaded ");

    //check if email in database, redir to reset pswd page if successful
    User.findOne({ email: req.body.email }, function(err, user) {
        if (user){
        	//compare hash to email
            bcrypt.compare(req.body.email, req.params.hash, function(err, hashresult) {
                if(hashresult) {

                    res.render('resetPasswordForm',
						{ title: 'Password Reset Link',
							email:req.body.email});
                } else {
                    res.redirect("/");
                }
            });
        } else {
            res.render('resetPasswordHome', { title: 'Dashboard', error: 'Invalid link'});
		}
    });


});

//password reset form
router.post('/resetPasswordConfirm', function(req, res) {
	console.log(req.body);

    User.findOne({ email: req.body.email }, function(err, user) {
        if (user){
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

// //user logout
// router.post('/logout', function(req, res) {
// 	if (req.session){
// 		req.session.reset();
// 	}
// 	res.redirect("/");
// });

module.exports = router;
