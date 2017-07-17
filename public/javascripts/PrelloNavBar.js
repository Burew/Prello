$(function() {
	$("#boards-button").on("click", function(event){
		$("#board").toggle();
	});

	$("#options-button").on("click", function(event){
		console.log("Options button clicked");
		$("#options").show();
	});

    $(document).on("click" ,function(event){
		var target = $(event.target);
        if (target.parents("#options-button").length === 0 &&
			target.parents("#options").length === 0){
            $("#options").hide();
        }
    });
});
