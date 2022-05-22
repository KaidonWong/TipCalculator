import React from "react";
import s from "./index.module.scss";

interface Props {
  marks: Array<string>;
}

const Bookmark: React.FC<Props> = (props) => {
  return (
    <div className={s["bookmark-container"]}>
      {props.marks.map((mark) => (
        <div className={s["one-mark"]} key={mark}>
          <span className={s["content"]}>{mark}</span>
          <span className={s["break"]}>/</span>
        </div>
      ))}
    </div>
  );
};

export default Bookmark;
