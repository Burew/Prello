/*
[
    {
        "_id": "5951678cfa8c1e645708417c",
        "key": "keung",
        "cards": [
            {
                "_id": "595172512f51de67c344e360",
                "description": "Card A1"
            },
            {
                "_id": "595172522f51de67c344e361",
                "description": "Card A2"
            },
            {
                "_id": "595172532f51de67c344e362",
                "description": "Card A3"
            },
            {
                "_id": "595172542f51de67c344e363",
                "description": "Card A4"
            }
        ],
        "title": "List 1"
    },
    {
        "_id": "595168cefa8c1e6457084182",
        "key": "keung",
        "cards": [
            {
                "_id": "595172bc2f51de67c344e369",
                "description": "Card B1"
            },
            {
                "_id": "595172bc2f51de67c344e36a",
                "description": "Card B2"
            }
        ],
        "title": "List 2"
    }
]
*/

//debugging helper functions, call printAll() to see content of local data structures
function findListIndex(listID) {
	for (var i = 0; i < listCards.length; i++){
		if (listCards[i]._id == listID){
			return i;
		}
	};	
	return -1;
};

function printAll(){
	listCards.forEach(printList);
};

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


//populate w/ data
var lol;
var listCards;
var map = {};

$(function() {
	
	$.ajax({
	//url: "http://thiman.me:1337/keung/list",
	url: "http://localhost:3000/list/",
	data: {
	},
	type: "GET",	 // Whether this is a POST or GET request
	dataType : "json", // The type of data we expect back
	})
	.done(function( json ){ //response is passed to this function
	 listCards = json;
	
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