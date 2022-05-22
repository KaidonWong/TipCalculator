import React from "react";
import s from "./index.module.scss";

const VideoRelated: React.FC = (props) => {
  return (
    <div id="video-remote" className={s["video-panel"]}>
      <div id="video-myself" className={s["video-myself"]}></div>
    </div>
  );
};

export default VideoRelated;
