import React from "react";
import s from "../index.module.scss";

import arrowurl from "../resource/arrow-up.png";
import { OneLog } from "..";

import { initialize, sendMessage } from "../../util/message";

interface Props {
  pushMyLog: (v: string) => void;
  setLogs: React.Dispatch<React.SetStateAction<OneLog[]>>;
}

const InputBox: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState("");
  const send = React.useCallback(() => {
    console.log("send");
    props.pushMyLog(value);
    setValue("");
    sendMessage(value);
  }, [value]);

  React.useEffect(() => {
    initialize(props.setLogs);
  }, []);

  return (
    <div className={s["input-frame"]}>
      <div className={s["input-outer"]}>
        <input
          type="text"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <div
          className={s["send-btn"]}
          onClick={() => {
            send();
          }}
        >
          <img src={arrowurl} />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
