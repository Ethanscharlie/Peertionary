
var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  document.getElementById("serverID").innerText = "My ID: " + id
});

peer.on('connection', function(conn) { 
  console.log(conn)
  document.getElementById("peerStatus").innerText = "Peer Status: Connected"
});

peer.on('data', function(conn) { 
  console.log(conn)
  document.getElementById("peerStatus").innerText = "Peer Status: Connected -> " + conn 
});

var conn
function inputID() {
  var input = prompt("What is id?");
  conn = peer.connect(input);
  conn.on('open', function() {
  	conn.on('data', function(data) {
  	  console.log('Received', data);
  	});
  });
}

function sendMessage() {
  var input = prompt("What is id?");
  conn.send(input)
}
