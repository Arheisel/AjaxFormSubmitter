function makeAjaxFormSubmitterConfiguration(postURL, index){
	return {
		id: index,
		url: postURL,
		dataClassName: index+"-textinput",
		beforeSend: function(){
			var instance = this;
			$("#submit_wrapper-"+instance.id).find(".progress-wrp").remove();
			$("#submit_wrapper-"+instance.id).append('<div id="progress-wrp_'+instance.id+'" class="progress-wrp">'
	                    +   '<div class="progress-bar"></div>'
	                    +   '<div class="status">0%</div>'
	                    +'</div>');
			return true;
		},
		success: function(){
			var progress_bar_id = "#progress-wrp_" + this.id;
	        $(progress_bar_id).css("cursor", "pointer");
	        $(progress_bar_id + " .progress-bar").css("width", "100%");
	        $(progress_bar_id + " .status").text("Se ha guardado con exito!");
	        $(progress_bar_id).click(function(){$(this).remove();});
		},
		error: function(error, textStatus) {
			var progress_bar_id = "#progress-wrp_" + this.id;
	        $(progress_bar_id).css("cursor", "pointer");
	        $(progress_bar_id + " .progress-bar").css("width", "100%").css("background-color", "pink");
	        $(progress_bar_id + " .status").text(error);
	        $(progress_bar_id).click(function(){$(this).remove();});
		},
		submit: "#submit-"+index,
		progressHandling: function(event) {
			var percent = 0;
			var position = event.loaded || event.position;
			var total = event.total;
			var progress_bar_id = "#progress-wrp_" + this.id;
			if (event.lengthComputable) {
			    percent = Math.ceil(position / total * 100);
			}
			// update progressbars classes so it fits your code
			$(progress_bar_id + " .progress-bar").css("width", +percent + "%");
			$(progress_bar_id + " .status").text(percent + "%");
		}
	};
}