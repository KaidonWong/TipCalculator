import React from "react";
import s from "./index.module.scss";
import c from "classnames";

import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

const options = {
  // Pass your App ID here.
  appId: "f694d757d015417abd7d2c14347ce9aa",
  // Set the channel name.
  channel: "testchannel",
  // Pass your temp token here.
  token:
    "006f694d757d015417abd7d2c14347ce9aaIADxMuj6/dchEcrNWXDlVW8wJ6DObFD6H7Av6iK/lZhozOpuE8wAAAAAEAB9OJJ5W3qMYgEAAQBieoxi",
  // Set the user ID.
  uid: window.location.hash.slice(1),
};

interface Props {
  videoOn: boolean;
  onStateChange: (
    v: Partial<{ audioStatus: boolean; videoStatus: boolean }>
  ) => void;
}

export interface Ref {
  startConference: () => void;
  joinConference: () => void;
  leaveConference: () => void;
  toggleAudio: (v: boolean) => void;
  toggleVideo: (v: boolean) => void;
}

const VideoRelated = React.forwardRef<Ref, Props>((props, ref) => {
  const { onStateChange } = props;

  const agoraClient = React.useRef<IAgoraRTCClient>();
  const localAudioTrack = React.useRef<IMicrophoneAudioTrack>();
  const localVideoTrack = React.useRef<ICameraVideoTrack>();

  const localVideoDom = React.useRef<HTMLDivElement>();
  const remoteVideoDom = React.useRef<HTMLDivElement>();

  const onUserUnpublished = React.useCallback(() => {
    if (remoteVideoDom.current) {
      remoteVideoDom.current.innerHTML = "";
    }
  }, []);

  const onUserPublished = React.useCallback(
    async (user: IAgoraRTCRemoteUser, mediaType: "video" | "audio") => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event
      await agoraClient.current.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the remote user publishes a video track.
      if (mediaType === "video") {
        // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play(remoteVideoDom.current);
      }
      // If the remote user publishes an audio track.
      if (mediaType === "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        const remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
      // Listen for the "user-unpublished" event
      agoraClient.current.on("user-unpublished", onUserUnpublished);
    },
    [onUserUnpublished]
  );

  const toggleAudio = React.useCallback(
    (v: boolean) => {
      localAudioTrack.current.setEnabled(v).then(() => {
        onStateChange({ audioStatus: v });
      });
    },
    [onStateChange]
  );

  const toggleVideo = React.useCallback(
    (v: boolean) => {
      localVideoTrack.current.setEnabled(v).then(() => {
        onStateChange({ videoStatus: v });
      });
    },
    [onStateChange]
  );

  const startConference = React.useCallback(() => {
    if (localVideoDom === undefined || remoteVideoDom === undefined) {
      return;
    }
    // Create an AgoraRTCClient object.
    const client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });
    agoraClient.current = client;
    // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
    client.on("user-published", onUserPublished);
  }, [onUserPublished]);

  const joinConference = React.useCallback(async () => {
    // Join an RTC channel.
    await agoraClient.current.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the RTC channel.
    await agoraClient.current.publish([
      localAudioTrack.current,
      localVideoTrack.current,
    ]);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    localVideoTrack.current.play(localVideoDom.current);
    console.log("publish success!");
  }, []);

  const leaveConference = React.useCallback(async () => {
    // Destroy the local audio and video tracks.
    localAudioTrack.current.close();
    localVideoTrack.current.close();

    // Traverse all remote users.
    agoraClient.current.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV containers.
      if (remoteVideoDom.current) {
        remoteVideoDom.current.innerHTML = "";
      }
    });

    // Leave the channel.
    await agoraClient.current.leave();
    if (localVideoDom.current) {
      localVideoDom.current.innerHTML = "";
    }
  }, []);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        startConference,
        joinConference,
        leaveConference,
        toggleAudio,
        toggleVideo,
      };
    },
    [startConference, joinConference, leaveConference, toggleAudio, toggleVideo]
  );

  return (
    <div className={s["video-panel"]}>
      <div className={s["video-remote"]} ref={remoteVideoDom}></div>
      <div
        className={c(s["video-local"], { [s["show"]]: props.videoOn })}
        ref={localVideoDom}
      ></div>
    </div>
  );
});

export default VideoRelated;
