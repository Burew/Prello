var express = require('express');
var mongoose = require('mongoose');
var Board = require('../models/board');
var requireLogin = require('./requireLogin');

var router = express.Router();

//get all boards (loading board page)
router.get('/', function(req, res, next) { 
	console.log("GET /board");
	Board.find(function (err, boards) {
		if (err) return console.error(err);
		res.json(boards);
	});
});

//get single board
router.get('/:boardID', function(req, res, next) { 
	console.log("GET /board/" + req.params.boardID);
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		//TODO: keep track of boardID for lists
		res.render('prelloSingleBoard', {title: 'Prello', currentBoardID: req.params.boardID});
		//res.redirect("/list/board");
	});
});	

//add new board
router.post('/', function(req, res, next) { 
	console.log("POST /board");
	var newBoard = new Board(
		/* req.body */
		{ 
			title: req.body.title,
			list: req.body.list, 
			userIDs:[req.user._id] //init to current user
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
	console.log("PATCH /board/" + req.params.boardID);
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
});

router.delete('/:boardID', function(req, res) {
	console.log("DELETE /board/" + req.params.boardID);
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

/* //route to a single board
router.get('/singleBoard', function(req, res, next) {
	res.render('prelloSingleBoard', { title: 'Single Board', error:''});
}); */

module.exports = router;
