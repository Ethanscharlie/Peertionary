var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
});



peer.on('connection', function(conn) { 
  console.log("Got connection form")
  console.log(conn)
});

var conn
function inputID() {
  var input = prompt("What is id?");
  var conn = peer.connect(input);
  conn.on('open', function() {
  	// Receive messages
  	conn.on('data', function(data) {
  	  console.log('Received', data);
  	});
  
  	// Send messages
  	conn.send('Hello!');
  });
}
