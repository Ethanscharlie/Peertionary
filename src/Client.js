class Client {
  constructor(code) {
    this.peer = new Peer();

    this.conn;
    this.clientID;
    this.smallID;

    this.functionToRunOnDataReceived = (data) => {}; // Fill with empty function

    this.peer.on("open", (id) => {
      this.clientID = id;
      this.smallID = this.clientID.split("-")[0];

      this.conn = this.peer.connect(code);

      this.conn.on("open", () => {
        console.log("Opened connected from " + id);
      });

      this.conn.on("data", this.functionToRunOnDataReceived);
    });
  }

  onDataReceived(func) {
    this.functionToRunOnDataReceived = func;
    return this;
  }

  sendMovement(x, y) {
    var data = {};
    data.moveX = x;
    data.moveY = y;
    this.conn.send(data);
  }
}
