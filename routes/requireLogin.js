function requireLogin (req, res, next) {
	console.log("Require Login checked, " + req.user.username);
	if (!req.user) {
		res.redirect('/');
	} else {
		next();
	}
};

module.exports = requireLogin;