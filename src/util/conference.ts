import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";

type RTC = {
  localAudioTrack: IMicrophoneAudioTrack;
  localVideoTrack: ICameraVideoTrack;
  client: IAgoraRTCClient;
};

let rtc: RTC = {
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

let options = {
  // Pass your App ID here.
  appId: "f694d757d015417abd7d2c14347ce9aa",
  // Set the channel name.
  channel: "testchannel",
  // Pass your temp token here.
  token:
    "006f694d757d015417abd7d2c14347ce9aaIADbb22pnitE3t0LZLMJ3GqCTVG/z8eH9m/PamZFGBnuV+puE8wAAAAAEABCwUE+4CSLYgEAAQDmJIti",
  // Set the user ID.
  uid: window.location.hash.slice(1),
};

export async function initialize() {
  // Create an AgoraRTCClient object.
  rtc.client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
  rtc.client.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    // If the remote user publishes a video track.
    if (mediaType === "video") {
      // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
      const remoteVideoTrack = user.videoTrack;
      // Dynamically create a container in the form of a DIV element for playing the remote video track.
      const remotePlayerContainer = document.createElement("div");
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      remotePlayerContainer.id = user.uid.toString();
      // remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
      remotePlayerContainer.style.width = "640px";
      remotePlayerContainer.style.height = "480px";

      const dom = document.querySelector("#video-remote");
      dom.append(remotePlayerContainer);

      // Play the remote video track.
      // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
      remoteVideoTrack.play(remotePlayerContainer);

      // Or just pass the ID of the DIV container.
      // remoteVideoTrack.play(playerContainer.id);
    }

    // If the remote user publishes an audio track.
    if (mediaType === "audio") {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      const remoteAudioTrack = user.audioTrack;
      // Play the remote audio track. No need to pass any DOM element.
      remoteAudioTrack.play();
    }

    // Listen for the "user-unpublished" event
    rtc.client.on("user-unpublished", (user) => {
      // Get the dynamically created DIV container.
      const remotePlayerContainer = document.getElementById(user.uid);
      // Destroy the container.
      remotePlayerContainer?.remove();
    });
  });
}

export function toggleAudio() {
  const status = rtc.localAudioTrack.enabled;
  rtc.localAudioTrack.setEnabled(!status);
}

export function toggleVideo() {
  const status = rtc.localVideoTrack.enabled;
  rtc.localVideoTrack.setEnabled(!status);
  const dom = document.querySelector("#video-myself");
  dom.style.visibility = !status ? "visible" : "hidden";
}

export async function joinCallback() {
  // Join an RTC channel.
  await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );
  // Create a local audio track from the audio sampled by a microphone.
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  // Create a local video track from the video captured by a camera.
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  // Publish the local audio and video tracks to the RTC channel.
  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  // Dynamically create a container in the form of a DIV element for playing the local video track.
  const localPlayerContainer = document.createElement("div");
  // Specify the ID of the DIV container. You can use the uid of the local user.
  localPlayerContainer.id = options.uid;
  // localPlayerContainer.textContent = "Local user " + options.uid;
  localPlayerContainer.style.width = "200px";
  localPlayerContainer.style.height = "150px";

  const dom = document.querySelector("#video-myself");

  dom.append(localPlayerContainer);

  // Play the local video track.
  // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
  rtc.localVideoTrack.play(localPlayerContainer);
  console.log("publish success!");
}

export async function leaveCallback() {
  // Destroy the local audio and video tracks.
  rtc.localAudioTrack.close();
  rtc.localVideoTrack.close();

  // Traverse all remote users.
  rtc.client.remoteUsers.forEach((user) => {
    // Destroy the dynamically created DIV containers.
    const playerContainer = document.getElementById(user.uid);
    playerContainer && playerContainer.remove();
  });

  // Leave the channel.
  await rtc.client.leave();

  const dom = document.querySelector("#video-myself");
  dom.innerHTML = "";
}

// startBasicCall();
