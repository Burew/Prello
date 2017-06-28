var currentCard;

$(function() {
	
	outerList = $(".outer-list");

	outerList.on("click", ".inner-list .add-card-button", function(event){
		$("#myModal").css("display","block");
		currentCard = event.target;
	});

	// When the user clicks on <span> (x), close the modal
	$(".close-modal").on("click", function(){
		$("#myModal").css("display","none");
		$("#new-card-form")[0].reset();
	}); 

	// When the user clicks anywhere outside of the modal, close it
	$(document).on("click", function(event){
		var modal = $("#myModal");
		if (event.target === modal[0]) {
			modal.css("display","none");
			$("#new-card-form")[0].reset();
		}
	}); 

	//add a new card
	$("#new-card-form").on("submit", function(event){
		event.preventDefault();
		
		//get value
		var card_title = $("#new-card-form input[name=title]").val();
		
		//get list 
		var currentList = $(currentCard).parents(".outer-list > li");
		var listID = currentList.attr("data-list-id"); 
		var cardID;
		var cards;
		
		//talk to server, get list first to find correct place to insert card
		//post to create, patch to update w/ relevant fields
		var serverResponse;
		$.ajax({
			url: "http://thiman.me:1337/keung/list/"+ listID +"/card",
			data: {
			},
			type: "POST",	 		// Whether this is a POST or GET request
			dataType : "json" 		// The type of data we expect back
		}).done(function( json ){
			serverResponse = json;
			cards = serverResponse.cards;
			cardID = cards[cards.length - 1]._id;

			//patch w/ cardID to change, add labels here later
			$.ajax({
				url: "http://thiman.me:1337/keung/list/"+ listID +"/card/" + cardID,
				data: {
					"_id": cardID,
					"description": card_title},
				type: "PATCH",	 		// Whether this is a POST or GET request
				dataType : "json" 		// The type of data we expect back
			});
			
			//update internal data structures;
			var i = findListIndex(listID);			
			listCards[i] = json;
			map[cardID] = {listIndex:i, cardIndex:cards.length - 1};
	
			//create new element, fill in data
			var newLi = $("<li/>");
			newLi.attr("data-card-id", cardID);
			newLi.html("<button type='button'>" + card_title +"</button>");
			
			//get current list and insert
			var innerListLi = $(currentCard).parent();  //insert-card <li>
			innerListLi.before(newLi);
		});
		
		//reset form modal
		$(".close-modal").click();		
		$(this)[0].reset();
	});

	
	//remove card
	outerList.on( "click", ".inner-list button:not(.add-card-button)", function(event) {
		var currentButton = $(event.target);		
		
		var cardID = currentButton.parent().attr("data-card-id");
		var listIndex = map[cardID].listIndex;
		var cardIndex = map[cardID].cardIndex;
		
		$.ajax({
			url: "http://thiman.me:1337/keung/list/"+ listCards[listIndex]._id +"/card/" + listCards[listIndex].cards[cardIndex]._id,
			data: {
			},
			type: "DELETE",	 		// Whether this is a POST or GET request
			dataType : "json", 		// The type of data we expect back
		}).done(function( json ){
			//update internal data structures;
			delete map[cardID];
			console.log(listCards[listIndex].cards);
			listCards[listIndex].cards.splice(cardIndex, 1);
			console.log(listCards[listIndex].cards);
		});
		
		//get parent, since the button was clicked and we want to remove the li (parent)
		currentButton.parent().remove(); 
	});
	
	
	// view or change card 
	outerList.on( "click", ".inner-list button:not(.add-card-button)",function(event) {
	
	});
	
});





