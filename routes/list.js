var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list');
var requireLogin = require('./requireLogin');

var router = express.Router();

/* Lists */
router.get('/', /* requireLogin, */ function(req, res) {
	List.find(function (err, lists) {
		if (err) return console.error(err);
		res.json(lists);
	});
});

router.get('/board', /* requireLogin, */ function(req, res) {
	List.find(function (err, lists) {
		if (err) return console.error(err);
		res.render('prelloSingleBoard', {title: 'Prello'});
	});
});

router.post('/', function(req, res){	
	var newList = new List(
		req.body //{title: req.body.title}
	);
	newList.save(function(err, list){
		if(err){
			console.log(err);
		} else {
			res.json(list);
		}
	});
});

router.patch('/:listID', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
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
	});
});

router.delete('/:listID', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		oldList.remove();
	});
	res.send(""); //status for HTTP ok
});

/* Cards */
//create new card
router.post('/:listID/card', function(req, res){
	List.findOne({ _id: req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		if (oldList == null){
			res.send("");
			return;
		}
		
		console.log("username: " + req.user.username);
		
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
	});
});

//modify card
router.patch('/:listID/card/:cardID', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
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
	});
});

router.delete('/:listID/card/:cardID', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
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
	});
});

/* Comments */
//create comment
router.post('/:listID/card/:cardID/comment', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
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
	});
});


module.exports = router;
