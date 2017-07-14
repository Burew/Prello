$(function() {
	var socket = io();

	//join current board room
	if (currentBoardID) {
        socket.emit('joinRoom', {'boardID': currentBoardID});
    } else {
		console.log("currentBoardID not defined");
	}

	socket.on('addNewCard', function(data) {
		console.log("New card socket received");

		var newLi = $("<li/>");
		newLi.attr("data-card-id", data.cardID);
		newLi.html("<button type='button'>" + data.card_title +"</button>");

		//get current list and insert
		var currentList = $("li[data-list-id=" + data.listID + "]");
		currentList.find("[data-card-id]").last().after(newLi);
	});

	socket.on('addList', function(data){
		listCards[listCards.length] = data;
		console.log("List socket received");

		var newLi = $("<li/>");

		//set data-list-id attr and add to list view
		newLi.attr("data-list-id", listCards[listCards.length - 1]._id);
		newLi.html("<div>" + listCards[listCards.length - 1].title + "<span class='close close-list'>×</span></div><ul class=inner-list><li><button class=add-card-button type=button>Add a card</button></ul>");
		$("li[data-list-id]").last().after(newLi);
	});

    socket.on('delList', function(data){
    	//update data structure
        listCards.splice(findListIndex(data.listID), 1);
        //update view
        $('li[data-boardid=' + data.listID + ']').remove();
    });

	//close socket when user navigates away
	$(window).on('unload', function(){
		alert("window closing");
		socket.close();
	});

});

