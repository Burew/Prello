var express = require('express');
var mongoose = require('mongoose');

var List = require('../models/list');
var Board = require('../models/board');

var requireLogin = require('./requireLogin');
var socketObject = require('./socketObject.js');

var router = express.Router();

// get listOFLists
router.get('/:boardID', /* requireLogin, */ function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		res.json(oldBoard);
	});
});

// add new list
router.post('/:boardID', function(req, res){
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		oldBoard.list.push(
			req.body
		);
		
		oldBoard.save(function(err, board){
		if(err){
			console.log(err);
		} else {
			socketObject.getInstance().to(req.params.boardID).emit('addList', board.list[board.list.length - 1]);
			res.json(board.list[board.list.length - 1]);
		}
		});
		
	});
});

// change current list
router.patch('/:boardID/:listID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		var oldList = oldBoard.list.id(req.params.listID);
		Object.assign(oldList, req.body);
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			res.json(newBoard.list.id(req.params.listID));
		}
		});
		
	});
});

// delete current list
router.delete('/:boardID/:listID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		oldBoard.list.pull(req.params.listID);
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			//res.json(newBoard.list.id(req.params.listID));
			res.send("");
		}
		});
	});
	
});

/* Cards */
//create new card
router.post('/:boardID/:listID/card', function(req, res){
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		var temp = oldBoard.list.id(req.params.listID);
		console.log(temp);
		temp.cards.push({
			title: req.body.title ||  "",
			description: req.body.description || "",
			labels: req.body.labels || [],
			author: req.user.username || "",
			comments: req.user.comments || ""
		});
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			var cards = newBoard.list.id(req.params.listID).cards;
			var cardsLen = cards.length;
			console.log(cards[cardsLen-1]);
            socketObject.getInstance().emit('addNewCard',
                {"cardID": cards[cardsLen-1]._id,
                    "listID" : req.params.listID,
                    "card_title": cards[cardsLen-1].title});
			
			res.json(newBoard.list.id(req.params.listID));
			
		}
		});
	});
	
});

//modify card
router.patch('/:boardID/:listID/card/:cardID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		var currentList = oldBoard.list.id(req.params.listID);
		Object.assign(currentList.cards.id(req.params.cardID), req.body);
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			//res.send(newBoard);
			res.json(newBoard.list.id(req.params.listID));
		}
		});
	});
});

router.delete('/:boardID/:listID/card/:cardID', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		var currentList = oldBoard.list.id(req.params.listID);
		currentList.cards.pull(req.params.cardID);
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			res.send("");
		}
		});
	});
});

/* Comments */
//create comment
router.post('/:boardID/:listID/card/:cardID/comment', function(req, res) {
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		var temp = oldBoard.list.id(req.params.listID);
		console.log(temp.cards.id(req.params.cardID));
		
		temp.cards.id(req.params.cardID).comments.push({
			"author": req.session.user.username,
			"comment": req.body.comment,
			"date": req.body.date
		});
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			res.json(newBoard.list.id(req.params.listID));
			//res.send(newBoard);
		}
		});
	});
});


module.exports = router;
