var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prello' , style:'stylesheets/singleBoardStylesheet.css'});
});

module.exports = router;
