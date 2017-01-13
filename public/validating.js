
$(document).ready(function () {
    var socket = io();
    
 //    socket.on('hidden', function(validate) {
 //        $('#' + validate.id ).remove();
 //    });
 //    socket.on('validates', function(validate) {
	//     $(".validates").append("<li class='validate' id='" + validate.id + "'>" +
 //                "<span class='title'>" + validate.id + "</span></li>");
	// });

	// socket.on('error', function(validate) {
	//     $(".validates").append("<li class='error' id='" + validate.id + "'>" +
 //                "<span class='title'>" + validate.id + "</span></li>");
	// });

	socket.on('error', function(validate) {
	    $(".validates").prepend("<li class='error' id='" + validate.id + "'>" +
                "<span class='title'>" + validate.id + "</span></li>");
	});

	socket.on('ok', function(validate) {
		$('#' + validate.id ).removeClass('error').addClass('ok');
	});

});