import React from "react";
import c from "classnames";
import s from "./index.module.scss";

import tipurl from "./resource/tips.png";
import audiourl from "./resource/audio.png";
import callurl from "./resource/call.png";
import settingurl from "./resource/settings.png";
import shareurl from "./resource/share.png";
import videourl from "./resource/video.png";
import fullurl from "./resource/Full screen.png";

import {
  initialize,
  joinCallback,
  leaveCallback,
  toggleAudio,
  toggleVideo,
} from "../util/conference";

const ControlPanel: React.FC = (props) => {
  const [videoOn, setVideoOn] = React.useState(true);
  const [audioOn, setAudioOn] = React.useState(true);
  return (
    <div className={s["below-video"]}>
      <div className={c("clearfix", s["left-block"])}>
        <div className={s["counter"]} onClick={initialize}>
          <img src={tipurl} />
          <span> 01 59</span>
        </div>
        <div className={s["extend"]} onClick={joinCallback}>
          Extend
        </div>
      </div>
      <div className={s["mid-block"]}>
        <img src={settingurl} />
        <img
          src={audiourl}
          className={c({ [s["inactive"]]: !audioOn })}
          onClick={() => {
            setAudioOn((v) => !v);
            toggleAudio();
          }}
        />
        <img
          src={videourl}
          className={c({ [s["inactive"]]: !videoOn })}
          onClick={() => {
            setVideoOn((v) => !v);
            toggleVideo();
          }}
        />
        <img src={shareurl} />
        <img src={callurl} onClick={leaveCallback} />
      </div>
      <div className={s["right-block"]}>
        <img src={fullurl} />
      </div>
      <div className={s["bottom-line"]}></div>
    </div>
  );
};

export default ControlPanel;
