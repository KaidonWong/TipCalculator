import React, { useState } from "react";
import s from "./index.module.scss";

import AgoraRTM, { RtmClient, RtmChannel, RtmMessage } from "agora-rtm-sdk";

import PersonCard from "./PersonCard";
import InputBox from "./InputBox";
import Log from "./Log";

type OneLog = {
  userId: string;
  content: string;
};

// tokens of rtm client
const tokens = {
  "1": "006d1ff842c563148c8875821cb2b1e4841IABMpi0J2+EZih6ms+Drjxi/O+DKLWvya57B13CHOz2qS7fv3IMAAAAAEABZGaJF33+MYgEA6ANfXZhi",
  "2": "006d1ff842c563148c8875821cb2b1e4841IABjqRrknmPT4HB2PPFU2AYIXm89QwzR75+iCFX2fQUbyQ2+1RoAAAAAEADtDBqywH+MYgEA6ANAXZhi",
};

// Your app ID
const appID = "d1ff842c563148c8875821cb2b1e4841";

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

// get user id from location
const uid = window.location.hash.slice(1);

// Params for login
let loginOptions = {
  uid,
  token: tokens[uid],
};

const ChattingPanel: React.FC = (props) => {
  const [logs, setLogs] = useState<Array<OneLog>>(demoLogs);

  // store rtm client
  const agoraRtmClient = React.useRef<RtmClient>();
  const agoraRtmChannel = React.useRef<RtmChannel>();

  // call back when receive remote message
  const onReceiveMessage = React.useCallback(
    (message: RtmMessage, memberId: string) => {
      console.log(
        "Message received from: " + memberId + " Message: " + message
      );
      if (message.messageType === "TEXT") {
        setLogs((v) => [...v, { userId: memberId, content: message.text }]);
      }
    },
    [setLogs]
  );

  React.useEffect(() => {
    agoraRtmClient.current = AgoraRTM.createInstance(appID);
    agoraRtmChannel.current =
      agoraRtmClient.current.createChannel("testchannel");

    // register callback on receive message
    agoraRtmChannel.current.on("ChannelMessage", onReceiveMessage);

    //login and join the channel
    agoraRtmClient.current.login(loginOptions).then(() => {
      agoraRtmChannel.current.join().then(() => {
        console.log(
          "You have successfully joined channel " +
            agoraRtmChannel.current.channelId
        );
      });
    });
  }, [onReceiveMessage]);

  // user send a message himself
  const pushMyLog = React.useCallback((value: string) => {
    setLogs((v) => [...v, { userId: uid, content: value }]);
    // notify the channel
    if (agoraRtmChannel.current !== undefined) {
      agoraRtmChannel.current.sendMessage({ text: value }).then(() => {
        console.log(
          "Channel message sent: " +
            value +
            " from " +
            agoraRtmChannel.current.channelId
        );
      });
    }
  }, []);

  // get the dom for auto scrolling when receive new message
  const scrollDom = React.useRef<HTMLDivElement>();

  // auto scroll when receive message
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
      <InputBox pushMyLog={pushMyLog} />
    </div>
  );
};

export default ChattingPanel;

export { OneLog };
