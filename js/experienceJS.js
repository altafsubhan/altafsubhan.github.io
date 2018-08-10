$(document).ready(function(){
	var currentID;
	$(".projectDescArea").mouseover(function(){
		currentID = this.id;
		$('#' + currentID + ' img').css('transform', 'translate(100%)');
		$('#' + currentID + ' div').css('transform', 'translate(0%)');
	});
	$(".projectDescArea").mouseout(function(){
		$('#' + currentID + ' img').css("transform", "translate(0)");
		$('#' + currentID + ' div').css("transform", "translate(-100%)");
	});

});