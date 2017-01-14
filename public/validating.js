
$(document).ready(function () {
    var socket = io();

	socket.on('error', function(validate) {
		$(".validates").prepend("<li class='error' id='" + validate.id + "'>" +
                "<span class='title'>" + validate.id + "</span> "+
                "<span class='timer' id='timer" + validate.id + "'></span>"+
                "</li>");
	    
		$('#' + validate.id).each(function () {
			var timer = $(this).children("#timer" + validate.id);
		    
			var startTime = Date.now();
			var interval  = setInterval(function() {
				var elapsedTime = Date.now() - startTime;
				timer.html((elapsedTime / 1000).toFixed(1));
			}, 100);

			$(this).children("#timer" + validate.id).attr( "interval", interval);
		});
	});

	socket.on('ok', function(validate) {
		$('#' + validate.id).removeClass('error').addClass('ok');
		var interval = $('#' + validate.id).children("#timer" + validate.id).attr('interval');
		clearInterval(interval);
	});
});