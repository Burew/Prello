$(function() {
	var addListForm = $("#add-list-form"),
		addListMessage = $("#add-list-message"),
		closeAddList = $("#close-add-list");
	
	
	/*------------------------------- General events -------------------------------*/
	//delete the selected list
	$(".outer-list").on("click", ".close-list", function(event){
		var removeThis = $(event.target).parents(".outer-list > li");
		var listID = $(removeThis).attr("data-list-id");
		
		$.ajax({
			url: "http://thiman.me:1337/keung/list/"+ listID,
			data: {
			},
			type: "DELETE",	 		// Whether this is a POST or GET request
			dataType : "json", 		// The type of data we expect back
		});
		
		$(removeThis).remove();
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
		//create new node - new list item w/ stuff inside
		var newLi = $("<li/>");
		
		//get value of list
		var newListValue = addListForm.children("input[name=listName]").val(); 
		
		//create new list in server
		$.ajax({
			url: "http://thiman.me:1337/keung/list",
			data: {
			},
			type: "POST",	 		// Whether this is a POST or GET request
			dataType : "json" 		// The type of data we expect back
		}).done(function( json ){
			var listID = json._id;
			
			newLi.attr("data-list-id",listID );
			
			//patch w/ a title
			$.ajax({
				url: "http://thiman.me:1337/keung/list/" + listID,
				data: {
					"title": newListValue
				},
				type: "PATCH",	 		
				dataType : "json"
			});
		});
		
		newLi.html("<div>List 3<span class='close close-list'>×</span></div><ul class=inner-list><li><button class=add-card-button type=button>Add a card</button></ul>");	
		addListForm.parents(".outer-list > li").before(newLi);
		
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


