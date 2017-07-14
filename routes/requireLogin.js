function requireLogin (req, res, next) {
	if (!req.user) {
		res.redirect('/'); //redir to homepage
	} else {
        console.log("Require Login checked, " + req.user.username);
		next();
	}
};

module.exports = requireLogin;