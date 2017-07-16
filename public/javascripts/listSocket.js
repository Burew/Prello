$(function() {
	var socket = io();

	//join current board room
	if (currentBoardID) {
        socket.emit('joinRoom', {'boardID': currentBoardID});
    } else {
		console.log("currentBoardID not defined");
	}

	socket.on('addCard', function(data) {
		console.log("Socket: add card");

		 //update map, but not listCards
		var i = findListIndex(data._id);
        var cards = data.cards;
        var cardID = cards[cards.length - 1]._id;

        listCards[i] = data;
		//map[cardID] = {listIndex:i, cardIndex: listCards[i].cards.length - 1};

		var newLi = $("<li/>");
		newLi.attr("data-card-id", cardID);

        //add close button, label div
        var displayLabelsDiv = $('<div/>').addClass("display-labels-div");
        var closeCardDiv = $('<div/>').addClass("close del-card").html("&times");
        newLi.append(displayLabelsDiv, closeCardDiv);

        //add card button
		newLi.append("<button type='button'>" + data.cards[cards.length - 1].title +"</button>");

		//get current list and insert
		var currentList = $("li[data-list-id=" + data._id + "]");
		currentList.find("li").last().before(newLi);

	});

    socket.on('delCard', function(data) {
        console.log("Socket: del card");
        console.log(data);

        var currentCard = $(`li[data-card-id=${data.cardID}]`);
        var listIndex =  $(`li[data-list-id=${data.listID}]`).index();
        var cardIndex = currentCard.index();

        //update view
        currentCard.remove();

		//update local data structures
        //delete map[data.cardID];
        listCards[listIndex].cards.splice(cardIndex, 1);

    });

	socket.on('addList', function(data){
		listCards[listCards.length] = data;
		console.log("Socket: add list");

		var newLi = $("<li/>");

		//set data-list-id attr and add to list view
		newLi.attr("data-list-id", listCards[listCards.length - 1]._id);
		newLi.html("<div>" + listCards[listCards.length - 1].title + "<span class='close close-list'>×</span></div><ul class=inner-list><li><button class=add-card-button type=button>Add a card</button></ul>");
        $('.outer-list').children('li:last').before(newLi);
	});

    socket.on('delList', function(data){
    	console.log('Socket: del list');
    	//update data structure
        listCards.splice(findListIndex(data.listID), 1);
        //update view
        $(`li[data-list-id=${data.listID}]`).remove();
    });

	//close socket when user navigates away
	$(window).on('unload', function(){
		socket.close();
	});

});

