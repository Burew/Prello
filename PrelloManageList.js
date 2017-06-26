$(function() {
	/*------------------------------- General events -------------------------------*/
	//delete the selected list
	$(".outer-list").on("click", ".close-list", function(event){
		var removeThis = $(event.target).parents(".outer-list > li");
		$(removeThis).remove();
	});
		
	/*------------------------------- message events -------------------------------*/
	//if user clicks on add list message, display form to add a list
	$("#add-list-message").on("click", function(){
		$("#add-list-message").css("display","none");
		$("#add-list-form").css("display","block");
	}); 


	/*------------------------------- form events -------------------------------*/
	//if user submits form, add a new list before the addList element
	$('#add-list-form').on("submit", function(event){
		event.preventDefault();
		//create new node - new list item w/ stuff inside
		var newLi = $("<li/>");
		
		//get value of list
		var newListValue = $("#add-list-form input[name=listName]").val(); 
		
		newLi.html("<ul class='inner-list'><li><div>" + newListValue +"<span class='close close-list'>&times;</span></div></li><li><button type='button' class='add-card-button'>Add a card</button></li></ul>");
		
		$('#add-list-form').parents(".outer-list > li").before(newLi);
		
		//reset the form
		$("#close-add-list").click();
	}); 

	//if user clicks x on form, revert back to add list message
	$("#close-add-list").on("click", function(){
		$("#add-list-message").css("display","block");
		$("#add-list-form")[0].reset();
		$("#add-list-form").css("display","none");
	}); 

});


