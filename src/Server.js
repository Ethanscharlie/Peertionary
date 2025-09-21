class GameState {
  constructor() {
    this.players = [];
    this.turn = 0;
  }
}

class Server {
  constructor() {
    this.peer = new Peer();
    this.connections = [];
    this.id;
    this.gameState = new GameState();

    this.onServerOpen = (code) => {};

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
      this.gameState.players.push(new Player(id));

      conn.on("data", (data) => {
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
      conn.send(this.gameState);
    });
  }

  gameLoop() {
    this.updatePhysics();
    this.updateForAllClients();
  }

  isAnythingMoving() {
    this.gameState.players.forEach((player) => {
      if (player.isMoving()) {
        return true;
      }
    });

    return false;
  }

  updatePhysics() {
    this.gameState.players.forEach((player) => {
      player.updatePhysics();
    });
  }
}
