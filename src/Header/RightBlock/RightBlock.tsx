import React from "react";
import s from "../index.module.scss";

import avatarurl from "./resource/avatar.png";
import bellurl from "./resource/bell.png";
import globeurl from "./resource/globe.png";
import helpurl from "./resource/help-circle.png";
import messageurl from "./resource/Message.png";
import downurl from "./resource/Down arrow.png";

const RightBlock: React.FC = () => {
  return (
    <div className={s["right-block"]}>
      <div className={s["time"]}>
        <img src={globeurl} />
        <span>UTC-05:00 Chicago</span>
        <img src={downurl} />
      </div>
      <img className={s["icon"]} src={helpurl} />
      <img className={s["icon"]} src={messageurl} />
      <img className={s["icon"]} src={bellurl} />
      <img className={s["icon"]} src={avatarurl} />
    </div>
  );
};

export default RightBlock;
