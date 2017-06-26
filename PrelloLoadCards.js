//build data structure
/*
{
"_id": "595148e42c02dc6144f3d964",
"title": "\"newList1\"",
"key": "keung",
"cards": [
	{
		"title": "List 1",
		"cards": [
			{
				"description": "Card A1"
			},
			{
				"description": "Card A2"
			},
			{
				"description": "Card A3"
			},
			{
				"description": "Card A4"
			}
		]
	},
	{
		"title": "List 2",
		"cards": [
			{
				"description": "Card B1"
			},
			{
				"description": "Card B2"
			},
			{
				"description": "Card B3"
			}
		]
	},
	{
		"title": "List 3",
		"cards": [
			{
				"description": "Card C1"
			}
		]
	}
]
}
*/
var map = {}

//populate w/ data
var lol;
var listCards;
$(function() {
	
	$.ajax({
	url: "http://thiman.me:1337/keung/list",
	data: {
	},
	type: "GET",	 // Whether this is a POST or GET request
	dataType : "json", // The type of data we expect back
	})
	.done(function( json ){ //response is passed to this function
	 listCards = json[0].cards;
	
	//do outer li in reverse order, to handle add-list
	lol = $('.outer-list');
	for(var i = listCards.length - 1; i >= 0; i--) {
		var list = listCards[i];
		var listLi = $('<li/>');	//create a list
		var titleDiv = $('<div/>').html(list.title + "<span class='close close-list'>&times;</span>");	//title for that list
		var cardsUl = $('<ul/>').addClass('inner-list');	//cards for that list
		
		//create cards, add to listLi
		for(var j = 0; j < list.cards.length; j++) {
		  var card = list.cards[j];  
		  var cardLi = $('<li/>');
		  cardLi.append('<button>'+ card.description +'</button>');
		  cardsUl.append(cardLi);
    }
	
	//add-card-button (last)
	cardsUl.append("<li><button type='button' class='add-card-button'>Add a card</button></li>");
    
    listLi.append(titleDiv, cardsUl);
	
    lol.prepend(listLi);
    //lol.append(listLi);
	//console.log(listLi);
  }
  
  //add-list 
  /*
  var listLi = $('<li/>');
  var cardsUl = $('<ul/>').addClass('inner-list');
  var cardLi = $("<li/>");
  var cardForm = $("<form/>");
  cardForm.attr("id", "add-list-form");
  cardForm.append(
	  '<input type="text" name="listName" placeholder="Add a list..." required>',
	  "<hr>", 
	  '<input type="submit" value="Save">', 
	  '<span id="close-add-list" class="close">&times;</span>'
  );
  cardLi.append(cardForm);
  cardsUl.append(cardLi);
  listLi.append("<div id='add-list-message'>Add a list</div>").append(cardsUl);
  lol.append(listLi);
	
	*/
  }); // ajax done
  
  /*
  lol.on('click', '.del-btn', function(e) {
    var cardId = $(this).attr('data-cardid');
    var cardMap = map[cardId];
    
    listCards[cardMap.listIndex].cards.splice(cardMap.cardIndex, 1);  	//update model
    // lol.find('li#{cardId}').remove();								//remove from view
    $(this).parent().remove();
    // Update map
    console.log(listCards);
  });
    
  console.log(map);
  */
});