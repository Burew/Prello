var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list');
var Board = require('../models/board');
var requireLogin = require('./requireLogin');

var router = express.Router();

// get listOFLists
router.get('/:boardID', /* requireLogin, */ function(req, res) {
/* 	List.find(function (err, lists) {
		if (err) return console.error(err);
		res.json(lists);
	}); */
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		//req.boardID = req.params.boardID;
		res.json(oldBoard);
	});
});

//default homepage for a listOfLists (empty webpage)
/* router.get('/board', requireLogin, function(req, res) {
	List.find(function (err, lists) {
		if (err) return console.error(err);
		res.render('prelloSingleBoard', {title: 'Prello'});
	});
}); */

// add new list
router.post('/:boardID', function(req, res){	
/* 	var newList = new List(
		req.body //{title: req.body.title}
	);
	newList.save(function(err, list){
		if(err){
			console.log(err);
		} else {
			res.json(list);
		}
	}); */
	
	console.log("boardID: " + req.params.boardID);
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
			res.json(board.list[board.list.length - 1]);
		}
		});
		
	});
});

// change current list
router.patch('/:boardID/:listID', function(req, res) {
/* 	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		
		Object.assign(oldList, req.body); //javascript op to update fields
		oldList.save(function(err, list){
			if(err){
				console.log(err);
			} else {
				res.json(list);
			}
		});
	}); */
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
/* 	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		oldList.remove();
	}); */
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
/* 	List.findOne({ _id: req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		
		//add new empty card
		oldList.cards.push(
			{
			title: req.body.title ||  "",
			description: req.body.description || "",
			labels: req.body.labels || [],
			author: req.user.username || ""
			}
			//req.body	//change later if attr are needed
		);
		
		oldList.save(function(err, list){
			if(err){
				console.log(err);
			} else {
				res.json(list);
			}
		});
	}); */
	
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
			author: req.user.username || ""
		});
		
		oldBoard.save(function(err, newBoard){
		if(err){
			console.log(err);
		} else {
			//res.json(newBoard.list.id(req.params.listID));
			//res.send(newBoard);
			res.json(newBoard.list.id(req.params.listID));
		}
		});
	});
	
});

//modify card
router.patch('/:boardID/:listID/card/:cardID', function(req, res) {
/* 	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		
		Object.assign(oldList.cards.id(req.params.cardID), req.body);
		oldList.save(function(err, list){
			if(err){
				console.log(err);
			} else {
				res.json(list);
			}
		});		
	}); */
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
/* 	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		//error checking
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		oldList.cards.id(req.params.cardID).remove();
		oldList.save(function(err, list){
			if(err){
				console.log(err);
			} else {
				res.send("");
			}
		});
	}); */
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
	/* List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		
		//Object.assign(oldList.cards.id(req.params.cardID), req.body);
		oldList.cards.id(req.params.cardID).comments.push({
			"author": req.session.user.username || "UNDEFINED_USER, USER MUST lOG IN FIRST",
			"comment": req.body.comment,
			"date": req.body.date
		});
		
		oldList.save(function(err, list){
			if(err){
				console.log(err);
			} else {
				res.json(list);
			}
		});		
	}); */
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
			"author": req.session.user.username || "UNDEFINED_USER, USER MUST lOG IN FIRST",
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
