var Board = require('../models/board');

function checkBoardAccess (req, res, next) {
	
	Board.findOne({_id: req.params.boardID}, function (err, oldBoard) {
		if (err) 
			return console.error(err);
		if (oldBoard == null){
			res.send("");
			return;
		}
		
		console.log("checkBoardAccess called on Board : " + oldBoard.title);
		//check if valid user for board
/* 		console.log(oldBoard.userIDs);
		var found = false;
		for (var i=0; i<oldBoard.userIDs.length; i++){
			if (req.user._id == oldBoard.userIDs[i]){
				found = true;
				break;
			}
		} */
		if (oldBoard.users.includes(req.user.username) == true){
			next();
		} else {
			res.render('prelloDashboard',
				{ title: 'DashBoard',error: 'You do not have acccess to this board'});
		};
	});
};

module.exports = checkBoardAccess;