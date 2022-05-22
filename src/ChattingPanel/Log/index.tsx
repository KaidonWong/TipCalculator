import React from "react";
import type { OneLog } from "../index";
import s from "../index.module.scss";
import c from "classnames";

import ava1url from "../resource/ava1.png";
import ava2url from "../resource/ava2.png";

type UserMap = {
  [key: string]: { name: string; role: string; job: string; avatar: string };
};

const userMap: UserMap = {
  "1": {
    name: "Eduardo Mckinney",
    role: "Attendee",
    job: "Principle Engineer @ App Dynamics",
    avatar: ava2url,
  },
  "2": {
    name: "Gladys Murphy",
    role: "Diamond Sponsor",
    job: "ELC Team",
    avatar: ava1url,
  },
};

interface Props {
  logs: OneLog[];
}

const Log: React.FC<Props> = (props) => {
  return (
    <>
      {props.logs.map((log, index) => {
        const user = userMap[log.userId];
        return (
          <div className={s["one-log"]} key={index}>
            <img src={user.avatar} />
            <div className={s["right-block"]}>
              <div className={s["info"]}>
                <div className={s["name"]}>{user.name}</div>
                <div
                  className={c(s["role"], {
                    [s["green"]]: user.role === "Diamond Sponsor",
                  })}
                >
                  {user.role}
                </div>
                <div className={s["job"]}>{user.job}</div>
              </div>
              <div className={s["content"]}>{log.content}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Log;
