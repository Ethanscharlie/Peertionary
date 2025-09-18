class Server {
  constructor(callback) {
    this.peer = new Peer();
    this.connections = [];
    this.messages = "";
    this.id;
    this.callback = callback;

    this.peer.on("open", (id) => {
      this.id = id;
      console.log(id);

      document.getElementById("servercode").innerText = id;

      console.log("Server Open");
      this.callback(id);
    });

    this.peer.on("connection", (conn) => {
      console.log("Got connection from " + conn.peer);
      this.connections.push(conn);
    
      conn.on("data", (data) => {
        this.messages += data + "\n";
        console.log(data);
    
        this.updateForAllClients();
      });
    });
  }

  updateForAllClients() {
    this.connections.forEach((conn) => {
      conn.send(this.messages);
    });
  }
}

