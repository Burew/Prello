// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];
var currentCard;

//adds a new card
/* var add_cards_buttons =  document.getElementsByClassName("add-card-button");
for (var i=0; i<add_cards_buttons.length; i++){
	add_cards_buttons[i].addEventListener("click", function(e){
		//display form
		modal.style.display = "block";
		currentCard = e.target;
		console.log(currentCard);
	});
} */

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
	if (event.target == modal) {
        $("#myModal").css("display","none");
    }
}); 

/*
// get form javascipt only
var card_form = document.getElementById('new-card-form');
card_form.addEventListener("submit", function(e){
	e.preventDefault();
	
	//get form values
	var card_title = card_form.elements[0].value; //first input
	
	//create new element and fill in data
	var newLi = document.createElement("LI");
	newLi.innerHTML = "<button type='button'>" + card_title +"</button>";
	
	//populate
	var parentList = currentCard.parentNode.parentNode.parentNode; //inner-list
	var innerList = parentList.lastChild.previousSibling;
	innerList.insertBefore(newLi, innerList.lastChild.previousSibling);
	
	//reset form, hide card-form
	span.click();
    card_form.reset();
}); 
*/

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

/* $(".inner-list > li").html(function(n, currentcontent){
	//n is current index in set of (inner-list > li)
    return currentcontent + "<span class='close close-card'>&times;</span>";
});  */


//remove card
$( ".outer-list" ).on( "click", ".inner-list button:not(.add-card-button)",function(event) {
	var button = event.target;
	
	//get parent, since the button was clicked and we want to remove the li (parent)
	$(button.parentNode).remove(); 
});






