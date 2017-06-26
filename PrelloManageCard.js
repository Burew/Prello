$(function() {
	var currentCard;

	$(".outer-list").on("click", ".inner-list .add-card-button", function(event){
		$("#myModal").css("display","block");
		currentCard = event.target;
		console.log(currentCard);
	});

	// When the user clicks on <span> (x), close the modal
	$(".close-modal").on("click", function(){
		$("#myModal").css("display","none");
	}); 

	// When the user clicks anywhere outside of the modal, close it
	$(document).on("click", function(event){
		var modal = $("#myModal");
		if (event.target === modal[0]) {
			modal.css("display","none");
		}
	}); 

	$("#new-card-form").on("submit", function(event){
		event.preventDefault();
		//get value
		var card_title = $("#new-card-form input[name=title]").val();
		
		//create new element, fill in data
		var newLi = $("<li/>");
		newLi.html("<button type='button'>" + card_title +"</button>");
		
		//get current list and insert
		var innerListLi = $(currentCard).parent(); 
		innerListLi.before(newLi);
		
		//reset form modal
		span.click();	
		$(this)[0].reset();
		
	});

	//remove card
	$( ".outer-list" ).on( "click", ".inner-list button:not(.add-card-button)",function(event) {
		var button = event.target;
		
		//get parent, since the button was clicked and we want to remove the li (parent)
		$(button.parentNode).remove(); 
	});
});





