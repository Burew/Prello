//build data structure
var listCards = [
  {
    title: 'List 1',
    cards: [
      {description: 'Card A1' },
      {description: 'Card A2' },
      {description: 'Card A3' },
	  {description: 'Card A4' }
	  /*Special : add a card*/
    ]
  },
  {
    title: 'List 2',
    cards: [
      {description: 'Card B1' },
      {description: 'Card B2' },
      {description: 'Card B3' }
	  /*Special : add a card*/
    ]
  },
  {
    title: 'List 3',
    cards: [
      {description: 'Card C1' }
	  /*Special : add a card*/
    ]
  }
  /*Special : add a list*/
];

var map = {}



/*
		<ul class="outer-list">
			<li>
				<div>List 1 <span class='close close-list'>&times;</span></div>
				<ul class="inner-list">
					<li><button type='button'>Card A1</button></li>
					<li><button type='button'>Card A2</button></li>
					<li><button type='button'>Card A3</button></li>
					<li><button type='button'>Card A4</button></li>
					<li><button type='button' class="add-card-button">Add a card</button></li>
				</ul>
			</li>
		</ul>

*/
//populate w/ data

var lol;
$(function() {
	
  lol = $('.outer-list');
  for(var i = 0; i < listCards.length; i++) {
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
    lol.append(listLi);
	console.log(listLi);
  }
  
/*
<li>
	<div id="add-list-message">Add a list</div>
	<ul class="inner-list">
		<li>	
			<form id="add-list-form">
			  <input type="text" name="listName" placeholder="Add a list..." required>
			  <hr>
			  <input type="submit" value="Save">
			  <span id="close-add-list" class="close">&times;</span>
			</form>
		</li>
	</ul>
</li>
*/  
  //add-list 
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