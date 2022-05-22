import React from "react";
import c from "classnames";
import s from "./index.module.scss";

import ControlPanel from "./ControlPanel";
import VideoRelated from "./VideoRelated";

const ConferencePanel: React.FC = (props) => {
  return (
    <div className={s["conference-container"]}>
      <div className={c("clearfix", s["above-video"])}>
        <div className={s["left-icon"]}>1:1 Match</div>
        <div className={s["header-content"]}>
          How to have a greet career in a lifetime
        </div>
      </div>
      <VideoRelated />
      <ControlPanel />
    </div>
  );
};

export default ConferencePanel;
