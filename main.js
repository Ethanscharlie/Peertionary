let pc;
let dataChannel;

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const localSdp = document.getElementById("localSdp");
const remoteSdp = document.getElementById("remoteSdp");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chat");

function log(msg) {
  chatBox.textContent += msg + "\n";
}

function createPeerConnection() {
  pc = new RTCPeerConnection(config);

  pc.onicecandidate = (e) => {
    if (e.candidate === null) {
      localSdp.value = JSON.stringify(pc.localDescription);
    }
  };

  pc.ondatachannel = (event) => {
    dataChannel = event.channel;
    setupDataChannel();
  };
}

function setupDataChannel() {
  dataChannel.onopen = () => log("✅ DataChannel is open!");
  dataChannel.onmessage = (e) => log("Peer: " + e.data);
}

async function startAsOfferer() {
  createPeerConnection();
  dataChannel = pc.createDataChannel("chat");
  setupDataChannel();

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
}

async function startAsAnswerer() {
  createPeerConnection();

  const offer = JSON.parse(remoteSdp.value);
  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  localSdp.value = JSON.stringify(pc.localDescription);
}

async function setRemote() {
  const remote = JSON.parse(remoteSdp.value);
  await pc.setRemoteDescription(new RTCSessionDescription(remote));
  log("✅ Remote SDP set");
}

function sendMessage() {
  const msg = messageInput.value;
  if (dataChannel && dataChannel.readyState === "open") {
    dataChannel.send(msg);
    log("You: " + msg);
    messageInput.value = "";
  } else {
    alert("DataChannel not open yet.");
  }
}
