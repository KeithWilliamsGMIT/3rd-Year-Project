// This is a temporary constant value. Clients with the same channel will be able
// to communicate. This value will later be retrieved from the server based on
// what contact the user clicks on.
const CHANNEL = "const";

// EventSource - https://developer.mozilla.org/en-US/docs/Web/API/EventSource
// "The EventSource interface is used to receive server-sent events. It connects
// to a server over HTTP and receives events in text/event-stream format without
// closing the connection."
// Create a new EventSource object where /stream is the endpoint defined in flask.
var source = new EventSource("/api/" + CHANNEL + "/stream");

// Get new data from subscribed channel and
// append it to the list of messages
source.onmessage = function (event) {
	var message = JSON.parse(event.data);
	addMessageToList(message);
};

// Close the source when the window is closed
$(window).on("beforeunload", function(){
	source.close();
});

// Send message to server. This message will
// be sent all clients subscribed to the same
// channel including this client.
$("#form").submit(function(e) {
	// The endpoint defined using flask to send messages
    var url = "/api/" + CHANNEL + "/message";

    $.ajax({
		type: "POST",
		url: url,
		data: $("#form").serialize(),
		success: function(data) {
			console.log("POSTED " + data);
		}
	});

	// Don't refresh the page
    e.preventDefault();
});

// Add the given message to the list
function addMessageToList(data) {
	$("#messages").append("<ul>" + data.sender + "> " + data.message + "</ul>");
};

// Get all messages from the backend
function getMessages() {
	// The endpoint defined using flask to retrieve messages
    var url = "/api/" + CHANNEL + "/messages";

    $.ajax({
		type: "GET",
		url: url,
		success: function(data) {
			var messages = JSON.parse(data);
				   
			for (var i = 0; i < messages.length; i++) {
				addMessageToList(messages[i]);
			}
		}
	});
}

getMessages();
