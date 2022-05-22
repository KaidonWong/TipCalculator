import React from "react";
import s from "./index.module.scss";
import c from "classnames";

const LeftMenu: React.FC = (props) => {
  const items = ["Hub", "People", "Messages", "History"];
  const [active, setActive] = React.useState("Hub");

  return (
    <div className={s["menu-container"]}>
      {items.map((item) => (
        <div
          className={c(s["one-item"], { [s["active"]]: active === item })}
          onClick={() => {
            setActive(item);
          }}
          key={item}
        >
          {item}
        </div>
      ))}
      <div className={s["special"]}>COMMUNITY</div>
    </div>
  );
};

export default LeftMenu;
