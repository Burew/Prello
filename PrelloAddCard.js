/*
var add_cards_buttons = document.querySelectorAll(".add-card")

for (var i=0; i<add_cards_buttons.length; i++){
	add_cards_buttons[i].addEventListener("click", function(e){
		document.getElementById('myModal').style.display = "block";
	});
}
*/
	//hide when click on x button or in background
	/*
	document.querySelector("#modal-background").addEventListener("click", function(e){
		var modal = document.getElementById('modal');
		var test = modal.style.display;
		console.log(test);
		if (test === "block"){
			modal.style.display = "none";
		}
		alert("On"); 
		
	});

	document.querySelector(".close").addEventListener("click", function(e){
		var test = document.getElementById('modal').style.display;
		if (test === "block"){
			document.getElementById('modal').style.display = "none";
		}
		alert("On");
		
	});
	*/

	// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("add-card-first");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	console.log("showing now");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	console.log("not showing - span");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
		console.log("not showing - window");
        modal.style.display = "none";
    }
}



