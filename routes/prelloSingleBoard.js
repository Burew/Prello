var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('prelloSingleBoard', { title: 'Prello Single Board' , style:'stylesheets/singleBoardStylesheet.css'});
});

module.exports = router;
