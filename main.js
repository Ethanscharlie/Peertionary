var connections = []
var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  document.getElementById("serverID").innerText = "My ID: " + id
});

peer.on('connection', function(conn) { 
  console.log(conn)
  document.getElementById("peerStatus").innerText = "Peer Status: Connected"
  
  conn.on('open', function() {
  	conn.on('data', function(data) {
      logMessage("Other", data)
  	});
  });

  connections.push(conn)
});

function inputID() {
  var input = prompt("What is id?");
  conn = peer.connect(input);
  conn.on('open', function() {
    document.getElementById("peerStatus").innerText = "Peer Status: Connected" 

  	conn.on('data', function(data) {
      logMessage("Other", data)
  	});
  });

  connections.push(conn)
}

function logMessage(from, message) {
  console.log(message)
  document.getElementById("messages").innerText += from + ": " + message + "\n" 
}

function sendMessage() {
  var input = prompt("Message?");
  logMessage("Me", input)

  connections.forEach((conn) => {
    conn.send(input)
  });
}
