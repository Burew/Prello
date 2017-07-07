var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Prello', error:''});
});

router.get('/logout', function(req, res, next) {
	if (req.session){ 
		req.session.reset();
	}
	res.redirect("/");
});

module.exports = router;
