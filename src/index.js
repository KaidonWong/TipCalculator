import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

function HistoryList(props) {
  const { addMark, text } = props;
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    if (text === "") {
      return;
    }
    setList((oriList) => [{ text, mark: addMark }, ...oriList]);
  }, [addMark, text]);

  return (
    <>
      <h1 className="list-header">History</h1>
      {list.length !== 0 && (
        <div className="list-container">
          {list.map((item) => (
            <div className="one-item" key={item.mark}>
              {item.text}
              <span
                className="close-icon"
                onClick={() => {
                  setList((list) => {
                    return list.filter((v) => v.mark !== item.mark);
                  });
                }}
              >
                X
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function App(props) {
  const [amount, setAmount] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const [currentCalc, setCurrentCalc] = React.useState("");
  const [mark, setMark] = React.useState(0);

  return (
    <div style={{ width: "500px" }}>
      <h1 className="calc-header">Tip Calculator</h1>
      <div className="one-line">
        <span>{"Amount($)"}</span>
        <input
          value={amount}
          type="number"
          onChange={(e) => {
            const v = e.target.value;
            setAmount(v);
          }}
        />
      </div>
      <div className="one-line">
        <span>{"Percentage(%)"}</span>
        <input
          value={percentage}
          onChange={(e) => {
            const v = e.target.value;
            setPercentage(v);
          }}
        />
      </div>
      <div
        className="btn-click"
        onClick={() => {
          const p = percentage / 100;
          const tip = p * amount;
          setCurrentCalc(
            `Amount:$${amount}, Percentage: ${percentage}%, Tip: $${Math.round(
              tip
            )}`
          );
          setMark((v) => v + 1);
        }}
      >
        Calculate
      </div>
      {currentCalc !== "" && <div className="current-calc">{currentCalc}</div>}
      <HistoryList addMark={mark} text={currentCalc} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
