
$(function(){
	
	$(".board-collection").on("click" , ".add-new-board", function(){
		var boardLI = $(this);
		console.log(boardLI);
		boardLI.find(".add-new-board-form-text").css("display", "none");
		boardLI.find(".add-new-board-form").css("display", "block");
	});

	//add boards
	$(".board-collection").on("submit", ".add-new-board-form", function(event){
		event.preventDefault();
		
		var boardForm = $(this);
		
		//get value
		var newBoardValue = boardForm.find("input[name=newBoardName]").val();
	
		let addBoardURL = "http://localhost:3000/board";

		console.log(`new board value: ${newBoardValue}`);
		//talk to server
		$.ajax({
			url: addBoardURL,
			data: {
				"title": newBoardValue
			},
			type: "POST",	 		
			dataType : "json" 		
		}).done(function( json ){
			//EXPECTED: json returned is new Board object with a BoardID
			//generate new Board element and add info from data received
			var newBoardLI = generateNewBoardObject(json._id, json.title);
			$(".add-new-board").before(newBoardLI);
		});
		
		
		//reset form, view
		boardForm.siblings(".add-new-board-form-text").css("display", "block");
		boardForm.css("display", "none");
		boardForm[0].reset();
	});
	
	//delete boards
	$(".board-collection").on("click", ".close-board", function(){
		var currentBoardClose = $(this);
		var currentBoard = currentBoardClose.parents("li");
	
		console.log("DEL Current Board: ");
		console.log(currentBoard);
		//get boardID from parent
		let boardID = currentBoard.attr("data-boardID");
		
		let delBoardURL = "http://localhost:3000/board/" + boardID;
		
		//send delete to server
		$.ajax({
			url: delBoardURL,
			data: {},
			type: "DELETE",	 
			dataType : "json", 
		}).done(function( json ){
			//delete from view once ajax done
			//TODO: AJAX does not send response
			//Need to update local data struct
			// -- add board after this delete becomes funky otherwise
		});
		
		currentBoard.remove();
	});
	
	//click on boards -- load a list
	//add href attr in each board, fix in backend
	//need to change listOfLists script
		
});