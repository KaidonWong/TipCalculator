import AgoraRTM from "agora-rtm-sdk";

const tokens = {
  "1": "006d1ff842c563148c8875821cb2b1e4841IACUpSIycjU1c4pyAFwXbivIbyIr/vQCbhhxnjgK1ceH17fv3IMAAAAAEABytz/bLyyLYgEA6AOvCZdi",
  "2": "006d1ff842c563148c8875821cb2b1e4841IABW1SxMLqT5IYxRURP4wBhje9sfCtD3fYYs0AGk0Bp4IQ2+1RoAAAAAEAACbUmeQyyLYgEA6APDCZdi",
};

const uid = window.location.hash.slice(1);

// Params for login
let options = {
  uid,
  token: tokens[uid],
};

let channel;

// Your app ID
const appID = "d1ff842c563148c8875821cb2b1e4841";
// Your token
// options.token =
//   "006d1ff842c563148c8875821cb2b1e4841IABpKdAhjhEE3VDI5a0AjQkMe2UxWwg2EdnkU9GIn5CVQrfv3IMAAAAAEAACna5JvCmLYgEA6AO8KYti";

// Button behavior
window.onload = async function () {
  // await client.login(options);
  // await channel.join().then(() => {
  //   console.log("You have successfully joined channel " + channel.channelId);
  // });
  // Buttons
  // login
  // document.getElementById("login").onclick = async function () {
  //   options.uid = document.getElementById("userID").value.toString();
  //   await client.login(options);
  // };
  // logout
  // document.getElementById("logout").onclick = async function () {
  //   await client.logout();
  // };
  // create and join channel
  // document.getElementById("join").onclick = async function () {
  //   // Channel event listeners
  //   // Display channel messages
  //   await channel.join().then(() => {
  //     document
  //       .getElementById("log")
  //       .appendChild(document.createElement("div"))
  //       .append("You have successfully joined channel " + channel.channelId);
  //   });
  // };
  // leave channel
  // document.getElementById("leave").onclick = async function () {
  //   if (channel != null) {
  //     await channel.leave();
  //   } else {
  //     console.log("Channel is empty");
  //   }
  // };
  // send peer-to-peer message
  // document.getElementById("send_peer_message").onclick = async function () {
  //   let peerId = document.getElementById("peerId").value.toString();
  //   let peerMessage = document.getElementById("peerMessage").value.toString();
  //   await client
  //     .sendMessageToPeer({ text: peerMessage }, peerId)
  //     .then((sendResult) => {
  //       if (sendResult.hasPeerReceived) {
  //         document
  //           .getElementById("log")
  //           .appendChild(document.createElement("div"))
  //           .append(
  //             "Message has been received by: " +
  //               peerId +
  //               " Message: " +
  //               peerMessage
  //           );
  //       } else {
  //         document
  //           .getElementById("log")
  //           .appendChild(document.createElement("div"))
  //           .append("Message sent to: " + peerId + " Message: " + peerMessage);
  //       }
  //     });
  // };
  // send channel message
  // document.getElementById("send_channel_message").onclick = async function () {
  //   let channelMessage = document
  //     .getElementById("channelMessage")
  //     .value.toString();
  //   if (channel != null) {
  //     await channel.sendMessage({ text: channelMessage }).then(() => {
  //       document
  //         .getElementById("log")
  //         .appendChild(document.createElement("div"))
  //         .append(
  //           "Channel message: " + channelMessage + " from " + channel.channelId
  //         );
  //     });
  //   }
  // };
};

export async function initialize(setLogs) {
  // Initialize client
  const client = AgoraRTM.createInstance(appID);

  // Client Event listeners
  // Display messages from peer
  client.on("MessageFromPeer", function (message, peerId) {
    console.log("Message from: " + peerId + " Message: " + message);
    // document
    //   .getElementById("log")
    //   .appendChild(document.createElement("div"))
    //   .append("Message from: " + peerId + " Message: " + message);
  });
  // Display connection state changes
  client.on("ConnectionStateChanged", function (state, reason) {
    console.log("State changed To: " + state + " Reason: " + reason);
    // document
    //   .getElementById("log")
    //   .appendChild(document.createElement("div"))
    //   .append("State changed To: " + state + " Reason: " + reason);
  });

  channel = client.createChannel("testchannel");

  channel.on("ChannelMessage", function (message, memberId) {
    console.log("Message received from: " + memberId + " Message: " + message);
    setLogs((v) => [...v, { userId: memberId, content: message.text }]);
    // document
    //   .getElementById("log")
    //   .appendChild(document.createElement("div"))
    //   .append("Message received from: " + memberId + " Message: " + message);
  });
  // Display channel member stats
  channel.on("MemberJoined", function (memberId) {
    console.log(memberId + " joined the channel");
    // document
    //   .getElementById("log")
    //   .appendChild(document.createElement("div"))
    //   .append(memberId + " joined the channel");
  });
  // Display channel member stats
  channel.on("MemberLeft", function (memberId) {
    console.log(memberId + " left the channel");
    // document
    //   .getElementById("log")
    //   .appendChild(document.createElement("div"))
    //   .append(memberId + " left the channel");
  });

  await client.login(options);
  await channel.join().then(() => {
    console.log("You have successfully joined channel " + channel.channelId);
  });
}

export async function sendMessage(value) {
  if (channel != null) {
    await channel.sendMessage({ text: value }).then(() => {
      console.log(
        "Channel message sent: " + value + " from " + channel.channelId
      );
    });
  }
}
