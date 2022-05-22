import React from "react";
import s from "../index.module.scss";
import img from "./logo.png";

import Bookmark from "../../Bookmark";

const LeftHeader: React.FC = () => {
  return (
    <div className={s["left-block"]}>
      <img src={img} />
      <Bookmark
        marks={[
          "ELC Community",
          "Match",
          "How to have a greet career in community",
          "Hub",
        ]}
      />
    </div>
  );
};

export default LeftHeader;
