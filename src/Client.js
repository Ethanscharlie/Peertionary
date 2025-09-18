class Client {
  constructor(code) {
    this.peer = new Peer();

    this.conn;
    this.clientID;
    this.smallID;

    this.peer.on("open", (id) => {
      this.clientID = id;
      this.smallID = this.clientID.split("-")[0];

      this.conn = this.peer.connect(code);

      this.conn.on("open", () => {
        console.log("Opened connected from " + id);
        this.conn.send(this.smallID + " connected.");
      });

      this.conn.on("data", (data) => {
        document.getElementById("messages").innerText = data;
      });
    });
  }

  sendMessage() {
    this.conn.send(this.smallID + " >>> " + prompt("Message?"));
  }
}
