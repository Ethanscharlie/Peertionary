class ServerNetworker {
  constructor() {
    this.peer = new Peer();
    this.connections = [];
    this.id;

    this.onServerOpen = (code) => {};
    this.onReceiveMoveData = (id, data) => {};
    this.onNewPlayerConnection = (id) => {};

    this.peer.on("open", (id) => {
      this.id = id;
      console.log(id);

      console.log("Server Open");
      this.onServerOpen(id);
    });

    this.peer.on("connection", (conn) => {
      console.log("Got connection from " + conn.peer);
      this.connections.push(conn);

      var id = conn.peer;
      this.onNewPlayerConnection(id);

      conn.on("data", (data) => {
        this.onReceiveMoveData(id, data);
      });
    });
  }

  setOnNewPlayerConnection(func) {
    this.onNewPlayerConnection = func;
    return this;
  }

  setOnServerOpen(func) {
    this.onServerOpen = func;
    return this;
  }

  setOnReceiveMoveData(func) {
    this.onReceiveMoveData = func;
    return this;
  }

  sendMessageToEveryone(data) {
    this.connections.forEach((conn) => {
      conn.send(data);
    });
  }
}

export { ServerNetworker };
