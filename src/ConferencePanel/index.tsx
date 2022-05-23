import React from "react";
import c from "classnames";
import s from "./index.module.scss";

import ControlPanel from "./ControlPanel";
import VideoRelated from "./VideoRelated";

import { Ref as VideoRef } from "./VideoRelated";

const ConferencePanel: React.FC = (props) => {
  const [audioOn, setAudioOn] = React.useState(true);
  const [videoOn, setVideoOn] = React.useState(true);

  const videoRef = React.useRef<VideoRef>();

  const onStateChange = React.useCallback((v) => {
    if (v.audioStatus !== undefined) {
      setAudioOn(v.audioStatus);
    }
    if (v.videoStatus !== undefined) {
      setVideoOn(v.videoStatus);
    }
  }, []);

  const onControl = React.useCallback((v) => {
    if (v.audio !== undefined) {
      videoRef.current.toggleAudio(v.audio);
    }
    if (v.video !== undefined) {
      videoRef.current.toggleVideo(v.video);
    }
    if (v.start !== undefined) {
      videoRef.current.startConference();
    }
    if (v.join !== undefined) {
      videoRef.current.joinConference();
    }
    if (v.leave !== undefined) {
      videoRef.current.leaveConference();
    }
  }, []);

  return (
    <div className={s["conference-container"]}>
      <div className={c("clearfix", s["above-video"])}>
        <div className={s["left-icon"]}>1:1 Match</div>
        <div className={s["header-content"]}>
          How to have a greet career in a lifetime
        </div>
      </div>
      <VideoRelated
        ref={videoRef}
        videoOn={videoOn}
        onStateChange={onStateChange}
      />
      <ControlPanel videoOn={videoOn} audioOn={audioOn} onControl={onControl} />
    </div>
  );
};

export default ConferencePanel;
