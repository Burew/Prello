var currentList;
var currentCard;
$(function(){
	
	var outerList = $(".outer-list");
	
	outerList.on("click", ".inner-list .add-card-button", function(event){
		$("#myModal").css("display","block");
		currentCard = event.target;
	});

	// When the user clicks on <span> (x), close the modal
	$(".close-modal").on("click", function(){
		//$("#myModal").css("display","none");
		//$("#cardModal").css("display","none");
		$(this).parents(".modal").css("display", "none")
		$("#new-card-form")[0].reset();
	}); 

	// When the user clicks anywhere outside of the modal, close it
	$(document).on("click", function(event){
		var modal = $("#myModal");
		if (event.target === modal[0]) {
			modal.css("display","none");
			$("#new-card-form")[0].reset();
		} /* else if (event.target === $("REPLACE THIS")) { //new card modal

		} */
	}); 

	//add a new card
	$("#new-card-form").on("submit", function(event){
		event.preventDefault();
		
		//get value from list
		var card_title = $("#new-card-form input[name=title]").val();
		
		//get list element
		currentList = $(currentCard).parents(".outer-list > li");
		var listID = currentList.attr("data-list-id"); 
		var cardID;
		var cards;
		
		//talk to server, get list first to find correct place to insert card
		//post to create, patch to update w/ relevant fields
		var serverResponse;

		$.ajax({
			url: "http://localhost:3000/list/" + currentBoardID + "/" + listID +"/card",
			data: {"title": card_title},
			type: "POST",	 		
			dataType : "json" 		
		}).done(function( json ){
/*			serverResponse = json;
			cards = serverResponse.cards;
			cardID = cards[cards.length - 1]._id;

			//update internal data structures with server response
			var i = findListIndex(listID);
			listCards[i] = json;
			map[cardID] = {listIndex:i, cardIndex:cards.length - 1};
			
 			//create new element, fill in data
			var newLi = $("<li/>");
			newLi.attr("data-card-id", cardID);
			newLi.html("<button type='button'>" + card_title +"</button>");
			
			//get current list and insert
			var innerListLi = $(currentCard).parent();  //insert-card <li>
			innerListLi.before(newLi); */
		});
		
		
		
		//reset form modal
		$(".close-modal").click();		
		$(this)[0].reset();
	});
	
	
	//remove card
 	outerList.on( "click", ".del-card", function(event) {
		var currentButton = $(event.target);		
		
		var cardID = currentButton.parent().attr("data-card-id");
		console.log("FrontEnd: Delete Card");
		console.log(currentButton);
		console.log(cardID);
		var listIndex = map[cardID].listIndex;
		var cardIndex = map[cardID].cardIndex;
		
		$.ajax({	
			///:boardID/:listID/card/:cardID
			url: "http://localhost:3000/list/" + currentBoardID + "/" + listCards[listIndex]._id +"/card/" + listCards[listIndex].cards[cardIndex]._id,
			data: {},
			type: "DELETE",
			dataType : "json",
		}).done(function( json ){
			//update internal data structures;
			/*
			delete map[cardID];
			listCards[listIndex].cards.splice(cardIndex, 1);
			*/
		});
		
		//get parent, since the button was clicked and we want to remove the li (parent)
		//currentButton.parent().remove();
	});
	
	
	
	// view or change card 
	outerList.on("click", ".inner-list button:not(.add-card-button)", function(event){
		
		$("#cardModal").css("display","block");
		
		var currentButton = $(event.target);
		var cardID = currentButton.parent().attr("data-card-id");
		console.log("CardID: " + cardID);
		var listIndex = map[cardID].listIndex;
		var cardIndex = map[cardID].cardIndex;
		
		//set current card for label data
		$("#cardModal").attr("data-card-id", cardID);
		$("#cardModal").attr("data-list-id", listCards[listIndex]._id);
		
		// change modal display for a card
		
		//set title,set description
		$("#single-card-title").html(listCards[listIndex].cards[cardIndex].description);
	
		//reset label display
		$(".select-color-label-big").removeClass("active").find("i").css("display", "none");
		
		//set labels in list view
		var cardViewLabels = $("#single-card-labels");
		cardViewLabels.html("");

		//get labels to display in card view
		var tempColors = listCards[listIndex].cards[cardIndex].labels;
		
		//display labels in card view
		for (var i =0; i < tempColors.length; i++){
			var newDiv = $("<div/>");
			newDiv.addClass("display-labels-card").css("background-color", tempColors[i]);
			cardViewLabels.append(newDiv);
		}
		
		//change labels in select labels
		/*
		var data = $("#cardModal").attr("data-card-id");
		var displayLabelsDiv = $(`li[data-card-id=${cardID}] .display-labels-div`);
		renderLabels(tempColors, displayLabelsDiv);
		*/
		
		//reset comments
		$("#comment-container").html("");
		
		// set comments
		var tempComments = listCards[listIndex].cards[cardIndex].comments;
		for (let comment of tempComments){
			renderComment(comment.comment, new Date(comment.date), comment.author);
		}
	});
	
});





