import React from "react";
import s from "./index.module.scss";
import LeftBlock from "./LeftBlock/LeftBlock";
import RightBlock from "./RightBlock/RightBlock";

const Header: React.FC = () => {
  return (
    <div className={s["header-container"]}>
      <LeftBlock />
      <RightBlock />
    </div>
  );
};

export default Header;
