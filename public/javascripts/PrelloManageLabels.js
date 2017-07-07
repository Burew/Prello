$(document).ready(function(){
	//load labels
	var labels = ["#B04632", "#D29034", "#F2D600", "#61BD4F", "#0079BF", "darkviolet", "C377E0"]
	for (var i=0; i< labels.length; i++){
	  var newDiv = $("<div/>");
	  newDiv.addClass("select-color-label-big");
	  newDiv.attr("data-bgcol", labels[i]);
	  newDiv.css('background-color', newDiv.data('bgcol'));
	  newDiv.append('<i class="material-icons">done</i>'); //add checkmark at the end
	  $(".select-color-list").append(newDiv);
	}


	//display div for form
	$("#add-labels-button").on("click", function(){
		$(".select-color-view").css("display", "block");
		//add checks to active labels
		
		var cardID = $("#cardModal").attr("data-card-id");
		var listIndex = map[cardID].listIndex;
		var cardIndex = map[cardID].cardIndex;
		var tempColors = listCards[listIndex].cards[cardIndex].labels;
		$(".select-color-label-big").removeClass("active").find("i").css("display", "none");
		for (var i=0; i<tempColors.length; i++){
			console.log(tempColors[i]);
			$(`.select-color-label-big[data-bgcol='${tempColors[i]}'`).addClass("active").find("i").css("display", "block");
		}
		
	});

	//selecting a label
	$(".select-color-list").on("click", ".select-color-label-big", function(){
		$(this).toggleClass("active");
		$(this).find("i").toggle();

		var tempColors = [];
		$("div.active").each(function(){
			tempColors.push($(this).attr("data-bgcol"));
		});
		
		var cardID = $("#cardModal").attr("data-card-id");
		
		var listIndex = map[cardID].listIndex;
		var cardIndex = map[cardID].cardIndex;
		
		//update data
		$.ajax({
			url: "http://localhost:3000/list/"+ listCards[listIndex]._id +"/card/" + listCards[listIndex].cards[cardIndex]._id,
			data: {
				labels: tempColors 
			},
			type: "PATCH",	 		
			dataType : "json", 	
		}).done(function( json ){
			//update internal data structures;
			listCards[listIndex] = json;
		});
		var displayLabelsDiv = $(`li[data-card-id=${cardID}] .display-labels-div`);
		renderLabels(tempColors, displayLabelsDiv);
	});
	
	//close label selector
	$(".close-labels").on("click", function(){
		$(".select-color-view").css("display", "none");
		//$("#cardModal").attr("data-card-id", "");
	});

});

  


