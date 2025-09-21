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
        this.sendMovement();
      });

      this.conn.on("data", this.functionToRunOnDataReceived);
    });
  }

  onDataReceived(func) {
    this.functionToRunOnDataReceived = func;
    return this;
  }

  sendMovement() {
    var data = {};
    data.moveX = 1;
    data.moveY = 0;
    this.conn.send(data);
  }
}
