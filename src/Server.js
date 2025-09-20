class Player {
  constructor() {
    this.ballX = 0;
    this.ballY = 0;
  }
}

class Server {
  constructor() {
    this.peer = new Peer();
    this.connections = {};
    this.messages = "";
    this.id;

    this.onServerOpen = (code) => {};

    this.peer.on("open", (id) => {
      this.id = id;
      console.log(id);

      console.log("Server Open");
      this.onServerOpen(id);
    });

    this.peer.on("connection", (conn) => {
      console.log("Got connection from " + conn.peer);
      this.connections[conn] = new Player();

      conn.on("data", (data) => {
        this.messages += data + "\n";
        console.log(data);

        this.updateForAllClients();
      });
    });
  }

  then(func) {
    this.onServerOpen = func;
    return this;
  }

  updateForAllClients() {
    this.connections.forEach((conn) => {
      conn.send(this.messages);
    });
  }
}
