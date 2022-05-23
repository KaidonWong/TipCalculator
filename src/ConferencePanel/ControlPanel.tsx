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

interface Props {
  videoOn: boolean;
  audioOn: boolean;
  onControl: (v: any) => void;
}

const ControlPanel: React.FC<Props> = (props) => {
  const { audioOn, videoOn, onControl } = props;
  return (
    <div className={s["below-video"]}>
      <div className={c("clearfix", s["left-block"])}>
        <div
          className={s["counter"]}
          onClick={() => {
            onControl({ start: true });
          }}
        >
          <img src={tipurl} />
          <span> 01 59</span>
        </div>
        <div
          className={s["extend"]}
          onClick={() => {
            onControl({ join: true });
          }}
        >
          Extend
        </div>
      </div>
      <div className={s["mid-block"]}>
        <img src={settingurl} />
        <img
          src={audiourl}
          className={c({ [s["inactive"]]: !audioOn })}
          onClick={() => {
            onControl({ audio: !audioOn });
          }}
        />
        <img
          src={videourl}
          className={c({ [s["inactive"]]: !videoOn })}
          onClick={() => {
            onControl({ video: !videoOn });
          }}
        />
        <img src={shareurl} />
        <img
          src={callurl}
          onClick={() => {
            onControl({ leave: true });
          }}
        />
      </div>
      <div className={s["right-block"]}>
        <img src={fullurl} />
      </div>
      <div className={s["bottom-line"]}></div>
    </div>
  );
};

export default ControlPanel;
