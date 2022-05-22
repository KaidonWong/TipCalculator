import React, { useState } from "react";
import s from "./index.module.scss";

import PersonCard from "./PersonCard";
import InputBox from "./InputBox";
import Log from "./Log";

type OneLog = {
  userId: string;
  content: string;
};

const demoLogs: OneLog[] = [
  { userId: "1", content: "Thanks everyone for joining the virtual booth!" },
  {
    userId: "2",
    content: `Stay tuned for our next conversation about "Technical Decision Making for the Long-Term"`,
  },
  {
    userId: "1",
    content:
      "Thanks everyone for joining the session! Let me know what your favorite part was",
  },
];

const uid = window.location.hash.slice(1);

const ChattingPanel: React.FC = (props) => {
  const [logs, setLogs] = useState<Array<OneLog>>(demoLogs);

  const scrollDom = React.useRef<HTMLDivElement>();

  const pushMyLog = React.useCallback((value: string) => {
    setLogs((v) => [...v, { userId: uid, content: value }]);
  }, []);

  React.useLayoutEffect(() => {
    scrollDom.current.scroll(0, scrollDom.current.scrollHeight);
  }, [logs]);

  return (
    <div className={s["chatting-panel"]}>
      <div className={s["chat-with"]}>You are chatting with:</div>
      <div className={s["scroll-block"]} ref={scrollDom}>
        <PersonCard
          name="Eduardo Mckinney"
          role="ATTENDEE"
          job="Head of Core Product Engineering @ Pinterest"
          description="Eric S. Yuan founded Zoom in 2011. Prior to starting Zoom, Eric was Corporate Vice President of Engineering at Cisco, where he was responsible for Cisco's collaboration software development. As you can see, this is the content that won't be shown on the screen"
        />
        <Log logs={logs} />
      </div>
      <InputBox pushMyLog={pushMyLog} setLogs={setLogs} />
    </div>
  );
};

export default ChattingPanel;

export { OneLog };
