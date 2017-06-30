var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


//modify this to fit your model
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
		console.log(oldList);
		oldList.remove();
	});
	res.send(""); //status for HTTP ok
});





/* Cards */
router.post('/:listID/card', function(req, res){
	
	List.findOne({ _id: req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		
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

router.patch('/:listID/card/:cardID', function(req, res) {
	List.findOne({ _id:  req.params.listID}, function (err, oldList) {
		if (err) 
			return console.error(err);
		
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
		if (err) 
			return console.error(err);
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
