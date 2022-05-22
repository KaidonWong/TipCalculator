import React from "react";
import c from "classnames";
import s from "../index.module.scss";

import bigavaurl from "../resource/BigAva.png";
import inurl from "../resource/in.png";

interface Props {
  name: string;
  role: string;
  job: string;
  description: string;
}

const PersonCard: React.FC<Props> = (props) => {
  const [collapse, setCollapse] = React.useState(true);

  return (
    <div className={s["card-frame"]}>
      <div className={c("clearfix", s["first-line"])}>
        <img src={bigavaurl}></img>
        <div className={s["right-desc"]}>
          <div className={s["role"]}>{props.role}</div>
          <div className={s["name"]}>
            {props.name}
            <img src={inurl} />
          </div>
          <div className={s["job"]}>{props.job}</div>
        </div>
      </div>
      <div className={c(s["second-line"], { [s["auto-collapse"]]: collapse })}>
        {props.description}
      </div>
      <div
        className={s["third-line"]}
        onClick={() => {
          setCollapse((v) => !v);
        }}
      >
        {collapse ? "+ Show more" : "Collapse"}
      </div>
    </div>
  );
};

export default PersonCard;
