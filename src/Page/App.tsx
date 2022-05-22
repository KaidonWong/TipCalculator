import React from "react";

import s from "./index.module.scss";

import Header from "../Header";
import LeftMenu from "../LeftMenu";
import ConferencePanel from "../ConferencePanel";
import ChattingPanel from "../ChattingPanel";

const App = (props) => {
  return (
    <>
      <Header />
      <div className={s["below-header"]}>
        <LeftMenu />
        <ConferencePanel />
        <ChattingPanel />
      </div>
    </>
  );
};

export default App;
