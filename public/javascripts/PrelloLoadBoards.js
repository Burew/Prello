function generateNewBoardObject(boardID, boardTitle){
	//build local board
	var boardLI = $("<li/>").attr("data-boardID", boardID);
	var boardClose = $("<span/>").addClass("close close-board").html("&times;");
	var boardListLink = "http://localhost:3000/board/" + boardID;
	var boardLink = $("<a/>").attr("href", boardListLink).html(boardTitle || "TITLE NOT DEFINED" );
	
	//put everything together
	boardLI.append(boardClose, boardLink);
	return boardLI;
}

$(function(){
	
	var getBoardURL = "http://localhost:3000/board/";
	
	$.ajax({
	url: getBoardURL,
	data: {},
	type: "GET",	 
	dataType : "json", 
	})
	.done(function( json ){
		/* <li>
				<span class="close close-board">&times;</span>
				<a href="LIST_LINK">LIST_TITLE</a>
			</li> */
		var boards = json;
		var boardCollection = $(".board-collection");
		
		//generate boards
		for(var i = 0; i < boards.length; i++){
			//add to list of boards
			boardCollection.append(generateNewBoardObject(boards[i]._id, boards[i].title));
			
			//add to local data structures?
		}
		
		//add addBoardForm
		var addBoardLI = $('<li/>').addClass('add-new-board');
		var addBoardLIMessage = $('<div/>')
			.addClass('add-new-board-form-text')
			.html('<a>Create a new board</a>');
		var addBoardLIForm = $('<form/>')
			.addClass('add-new-board-form')
			.append('<input type="text" name="newBoardName" placeholder="Enter a new board name...">')
			.append('<input type="submit" value="Save">');
		addBoardLI.append(addBoardLIMessage, addBoardLIForm);
		boardCollection.append(addBoardLI);
	}); //end ajax
	
	
});