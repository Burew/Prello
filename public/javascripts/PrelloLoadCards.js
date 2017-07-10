//debugging helper functions, call printAll() to see content of local data structures
function findListIndex(listID) {
	for (var i = 0; i < listCards.length; i++){
		if (listCards[i]._id == listID){
			return i;
		}
	};	
	return -1;
}

function printAll(){
	listCards.forEach(printList);
}

function printList(list){
	console.log("Title: " + list.title);
	console.log("cards:");
	list.cards.forEach(printCard);
}
function printCard(card){
	console.log("     " + card.description);
}

function renderLabels(tempColors, displayLabelsDiv){
	//reset div value
	displayLabelsDiv.html("");

	//generate items
	for (var i =0; i < tempColors.length; i++){
		var newDiv = $("<div/>");
		newDiv.addClass("display-labels").css("background-color", tempColors[i]);
		displayLabelsDiv.append(newDiv);
	}
} 

function addNewComment(newComment){
	
	let date = new Date();
	//modify local data structures and server 
	var cardID = $("#cardModal").attr("data-card-id");
	var listIndex = map[cardID].listIndex;
	var cardIndex = map[cardID].cardIndex;

	//update local data structure later
	$.ajax({
		url: "http://localhost:3000/list/" + currentBoardID + "/" + listCards[listIndex]._id +"/card/" + listCards[listIndex].cards[cardIndex]._id +"/comment",
		data: {
			comment: newComment,
			date: date.toString() //use a date string, use new Date(timestamp).toLocaleString() to read
		},
		type: "POST",	 		
		dataType : "json", 	
	}).done(function( json ){
		//update internal data structures;
		listCards[listIndex] = json;
		let len = json.cards[cardIndex].comments.length;
		renderComment(newComment, date, json.cards[cardIndex].comments[len - 1].author);
	});
}

function renderComment(comment, date, author){
	//generate comment block and display in card view
	let mainDiv=$("<div/>").addClass("comment");

	//comment data
	let commentDiv=$("<div/>").addClass("comment-content").html(comment);
	//comment author data
	let dataDiv=$("<div/>").addClass("comment-data");
	let authorSpan = $("<span/>").addClass("comment-author").html(author);
	//let timeStamp = new Date();
	let timeSpan = $("<span/>").addClass("comment-time").html(date.toLocaleString());
	//let dateSpan = $("<span/>").addClass("comment-date").html(date.toLocaleDateString());

	//dataDiv.append("- ", authorSpan, " at " ,timeSpan, ", ", dateSpan );
	dataDiv.append("- ", authorSpan, " at ", timeSpan);
	
	mainDiv.append(commentDiv, dataDiv);

	//add comment, most recent first
	$("#comment-container").prepend(mainDiv);
};


//populate w/ data
var lol;
var listCards;
var map = {};

$(function(){
	
	$.ajax({
	//url: "http://thiman.me:1337/keung/list",
	//url: "http://localhost:3000/list/",
	url: "http://localhost:3000/list/" + currentBoardID, 
	data: {
	},
	type: "GET",	 // Whether this is a POST or GET request
	dataType : "json", // The type of data we expect back
	})
	.done(function( json ){ //response is passed to this function
	 listCards = json.list;
	
	//do outer li in reverse order, to handle add-list
	lol = $('.outer-list');
	for(var i = listCards.length - 1; i >= 0; i--){
		var list = listCards[i];
		var listIndex = i;
		var listLi = $('<li/>');	//create a list
			listLi.attr("data-list-id", list._id);
		var titleDiv = $('<div/>').html(list.title + "<span class='close close-list'>&times;</span>");	//title for that list
		var cardsUl = $('<ul/>').addClass('inner-list');	//cards for that list
		
		//create cards, add to listLi
		for(var j = 0; j < list.cards.length; j++) {
		  var card = list.cards[j];  
		  var cardIndex = j;
		  var cardLi = $('<li/>').attr("data-card-id", card._id);
		  
		  //render labels
		  var displayLabelsDiv = $('<div/>').addClass("display-labels-div");
		  renderLabels(card.labels, displayLabelsDiv);
		  cardLi.append(displayLabelsDiv); 
		  
		  map[card._id] = {listIndex, cardIndex}; //listIndex, cardIndex;
		  cardLi.append('<button type="button">'+ card.description +'</button>');
		  cardsUl.append(cardLi); 
		}
		
		//add-card-button (last)
		cardsUl.append("<li><button type='button' class='add-card-button'>Add a card</button></li>");
		listLi.append(titleDiv, cardsUl);
		lol.prepend(listLi);
	}
  
  }); //end ajax
  
});