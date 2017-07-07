$("#comment-form").on("submit", function(event){
	event.preventDefault();
	
	//get value
	let commentTextArea = $(this).find("textarea[name=comment]");
	let newComment = commentTextArea.val();

	addNewComment(newComment);
	
	//reset value
	commentTextArea.val("");
	
});


