$(function(){
	var userBoardForm = $("#add-user-to-board");
	
	userBoardForm.on("submit", function(event){
		event.preventDefault();
		//get value
		var testUsername = $(this).children("input[name=username]").val();
		
		$.ajax({
			///:boardID/addNewUser
			url: "http://localhost:3000/board/" + currentBoardID + "/addNewUser",
			data: {
				"username": testUsername,
				"email": testUsername
			},
			type: "POST",	 		
			dataType : "json" 		
		}).done(function( json ){
			console.log(json);
			if(json.length !== 0){
				console.log(`User ${testUsername} successfully added to board`);
			} else {
				console.log(`User ${testUsername} not added to board`)
			}
			
		
		});
		
		userBoardForm[0].reset();
	});
});