var peer = new Peer();

peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
});

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
