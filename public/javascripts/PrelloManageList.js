$(function() {
	var addListForm = $("#add-list-form"),
		addListMessage = $("#add-list-message"),
		closeAddList = $("#close-add-list");
	
	
	/*------------------------------- General events -------------------------------*/
	//delete the selected list
	$(".outer-list").on("click", ".close-list", function(event){
		var removeThis = $(event.target).parents(".outer-list > li");
		var listID = $(removeThis).attr("data-list-id");
		
		//DELETE the current list associated w/ listID on server 		
		$.ajax({
			url: "http://localhost:3000/list/"+ currentBoardID + "/" + listID,
			data: {},
			type: "DELETE",	 
			dataType : "json", 
		});
		
		//delete list in data structure, and in HTML 
		// listCards.splice(findListIndex(listID), 1);
		// $(removeThis).remove();
	});
		
	/*------------------------------- message events -------------------------------*/
	//if user clicks on add list message, display form to add a list
	addListMessage.on("click", function(){
		addListMessage.css("display","none");
		addListForm.css("display","block");
	}); 


	/*------------------------------- form events -------------------------------*/
	//if user submits form, add a new list before the addList element
	addListForm.on("submit", function(event){
		event.preventDefault();

			
		//get value of list
		var newListValue = addListForm.children("input[name=listName]").val(); 
		
		//create new list in server using POST 
		$.ajax({
			url: "http://localhost:3000/list/" + currentBoardID,
			data: {
				"title": newListValue
			},
			type: "POST",	 		
			dataType : "json" 		
		}).done(function(json){
			//assign new list to local data stucture using data returned by server
/* 			listCards[listCards.length] = json;
			console.log("List successfully created");
			
			//create new node - new list item w/ stuff inside
			var newLi = $("<li/>");
			
			//set data-list-id attr and add to list view
			newLi.attr("data-list-id", listCards[listCards.length - 1]._id);
			newLi.html("<div>" + newListValue + "<span class='close close-list'>×</span></div><ul class=inner-list><li><button class=add-card-button type=button>Add a card</button></ul>");	
			addListForm.parents(".outer-list > li").before(newLi); */
		});
		
		
		
		//reset the form
		closeAddList.click();
	}); 

	//if user clicks x on form, revert back to add list message
	closeAddList.on("click", function(){
		addListMessage.css("display","block");
		addListForm[0].reset();
		addListForm.css("display","none");
	});
	
	

});


