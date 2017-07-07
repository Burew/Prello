$(function(){
	
	$("li.add-new-board").on("click", function(){
		var boardLI = $(this);
		console.log(boardLI);
		boardLI.find(".add-new-board-form-text").css("display", "none");
		boardLI.find(".add-new-board-form").css("display", "block");
	});
	
	$(".board-collection").on("submit", ".add-new-board-form", function(event){
		event.preventDefault();
		
		var boardForm = $(this);
		
		//get value
		var newBoardValue = boardForm.find("input[name=newBoardName]").val();
		
		//talk to server
		$.ajax({
			url: "http://localhost:3000/board",
			data: {
				"title": newBoardValue
			},
			type: "POST",	 		
			dataType : "json" 		
		}).done(function( json ){
			//assign new list to local data stucture using data returned by server
			//listCards[listCards.length] = json;
		});
		
		
		//reset form, view
		boardForm.siblings(".add-new-board-form-text").css("display", "block");
		boardForm.css("display", "none");
		boardForm[0].reset();
	});
		
});