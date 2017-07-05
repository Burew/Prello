var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list');

var router = express.Router();

//modify this to fit your model
/*
var card = new mongoose.Schema({ //has to be schema for a card`
	title: String,
	description: String,
	labels: Array
});


var List = mongoose.model('List', { //model the list
	title: String,
	cards: [card],
	description: String
});

*/


/* Lists */
router.get('/', function(req, res) {
	//res.render('index', { title: 'Express' });
	List.find(function (err, lists) {
		if (err) return console.error(err);
		res.json(lists);
	})
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
		
		//add new empty card
		oldList.cards.push(
			/*
			title: req.body.title ||  "",
			description: req.body.description || "",
			labels: req.body.labels || []
			*/
			req.body	//change later if attr are needed
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



module.exports = router;
