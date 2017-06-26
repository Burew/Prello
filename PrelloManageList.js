$(function() {
	//get add-list element
	var addListMessage = document.getElementById('add-list-message'),
		addListForm = document.getElementById('add-list-form'),
		addListFormCloseButton = document.getElementById('close-add-list');
		
	/*------------------------------- General events -------------------------------*/
	//delete the selected list
	/* var del_list_buttons =  document.getElementsByClassName("close-list");
	for (var i=0; i<del_list_buttons.length; i++){
		del_list_buttons[i].addEventListener("click", function(e){
			if (e.target) {
				var removeThis = e.target.parentNode.parentNode.parentNode.parentNode; 	//inner-list
				var outer_list =  removeThis.parentNode;								//outer-list
				outer_list.removeChild(removeThis);
			}
		});
	}  */

	//delete the selected list
	$(".outer-list").on("click", ".close-list", function(event){
		console.log(event.target);
		//var removeThis = event.target.parentNode.parentNode.parentNode.parentNode;
		var removeThis = $(event.target).parents(".outer-list > li");
		$(removeThis).remove();
	});
		
	/*------------------------------- message events -------------------------------*/
	//if user clicks on add list message, display form to add a list
	addListMessage.addEventListener("click", function(){
		addListMessage.style.display = "none";
		addListForm.style.display = "block";
	}); 


	/*------------------------------- form events -------------------------------*/
	//if user submits form, add a new list before the addList element
	addListForm.addEventListener("submit", function(e){
		e.preventDefault();
		//create new node - new list item w/ stuff inside
		var newLi = document.createElement("LI");
		
		//get value of list
		var newListValue = addListForm.elements[0].value; 
		
		newLi.innerHTML = "<ul class='inner-list'><li><div>" + newListValue +"<span class='close close-list'>&times;</span></div></li><li><button type='button' class='add-card-button'>Add a card</button></li></ul>";
		var listOfLists = document.getElementsByClassName("outer-list")[0];
		listOfLists.insertBefore(newLi, listOfLists.lastChild.previousSibling);
		
		//reset the form
		addListFormCloseButton.click();
	}); 

	//if user clicks x on form, revert back to add list message
	addListFormCloseButton.addEventListener("click", function(){
		addListMessage.style.display = "block";
		addListForm.reset();
		addListForm.style.display = "none";
	}); 

});


