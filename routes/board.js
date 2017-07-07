var express = require('express');
var mongoose = require('mongoose');
var Board = require('../models/board');
var requireLogin = require('./requireLogin');

var router = express.Router();

//boards page
router.get('/', function(req, res, next) { 
	res.render('prelloDashboard', { title: 'Dashboard', error:''});
});

//get lists of board
router.get('/:boardID', function(req, res, next) { 
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		//get listIDs
		
	});
	res.send("");
});

//add new board
router.post('/', function(req, res, next) { 
	var newBoard = new Board(
		/* req.body */
		{ 
			list: req.body.list, 
			userIDs:[ req.user.username || "USERNAME" ]
		}
	);
	newBoard.save(function(err, board){
		if(err){
			console.log(err);
		} else {
			res.json(board);
		}
	});
});

//change board -- add users?
//replaces content of entire board
router.patch('/:boardID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		Object.assign(oldBoard, req.body); 
		oldBoard.save(function(err, board){
			if(err){
				console.log(err);
			} else {
				res.json(board);
			}
		});
		
	});
	res.send("");
});

router.delete('/:boardID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		oldBoard.remove();
	});
	res.send("");
});

//route to a single board
router.get('/singleBoard', function(req, res, next) {
	res.render('prelloSingleBoard', { title: 'Single Board', error:''});
});

module.exports = router;
