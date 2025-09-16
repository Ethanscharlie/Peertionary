var connections = []
var peer = new Peer();
var myid = ""

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  document.getElementById("serverID").innerText = "My ID: " + id
  myid = id
});

peer.on('connection', function(conn) { 
  onGeneralConnectionOpen(conn)
});

function inputID() {
  var input = prompt("What is id?");
  conn = peer.connect(input);
  onGeneralConnectionOpen(conn)
}

function onGeneralConnectionOpen(conn) {
  conn.on('open', function() {
    document.getElementById("peerStatus").innerText = "Peer Status: Connected" 

  	conn.on('data', function(data) {
      logMessage(data)
  	});
  });

  connections.push(conn)
}

function logMessage(message) {
  console.log(message)
  document.getElementById("messages").innerText += message + "\n" 
}

function sendMessage() {
  var input = prompt("Message?");
  logMessage("Me:" + input)

  connections.forEach((conn) => {
    conn.send(myid + ": " + input)
  });
}
