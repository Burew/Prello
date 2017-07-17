var express = require('express');
var mongoose = require('mongoose');

var Board = require('../models/board');
var User = require('../models/user');

var requireLogin = require('./requireLogin');
var checkBoardAccess = require('./checkBoardAccess');
var socketObject = require('./socketObject.js');

var router = express.Router();

//main dashboard for a user
router.get('/dashboard', function(req, res, next) {
    res.render('prelloDashboard', { title: 'DashBoard', error: ""});
});

//get all boards that belong to a user
router.get('/', function(req, res, next) { 
	Board.find({users: req.user.username}, function (err, boards) {
		if (err) return console.error(err);
		res.json(boards);
	});
});

//get single board
router.get('/:boardID', checkBoardAccess, function(req, res, next) { 
	//console.log("GET /board/" + req.params.boardID);
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}


		res.render('prelloSingleBoard', {title: 'Prello', currentBoardID: req.params.boardID});
	});
});	

//add new board
router.post('/', function(req, res, next) {
	var newBoard = new Board(
		/* req.body */
		{ 
			title: req.body.title,
			list: req.body.list, 
			author: req.user.username,
			users:[req.user.username] //init to current user
		}
	);
	
	newBoard.save(function(err, board){
		if(err){
			console.log(err);
		} else {
			//socketObject.getInstance().emit('Board message', "Socket info: New Board Added");
			res.json(board);
		}
	});
});

//add new user
router.post('/:boardID/addNewUser', checkBoardAccess, function(req, res, next) { 
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.json([]);
			return;
		}	
		
		//add new user to board  req.user?
		User.findOne( {$or: [{username: req.body.username}, {email: req.body.email}] },
		function (err, newUser) {
			console.log("newUser:" + newUser);
			
			if (newUser == null){
				res.json([]);
				return;
			}
			
			//need to check for dup
			if (oldBoard.users.includes(newUser.username) == false){
				oldBoard.users.push(newUser.username);
				
				oldBoard.save(function(err, board){
					if(err){
						console.log(err);
					} else {
						res.json(board);
					}
				});
			}
			else {
				res.json([]);
			}
		});
	});
});

//change board - replaces content of entire board
router.patch('/:boardID', checkBoardAccess, function(req, res) {
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

router.delete('/:boardID', checkBoardAccess, function(req, res) {
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

module.exports = router;
