import React, { useEffect, useState } from "react";
import "./App.css";

enum RadioValues {
  money = "money",
  points = "points",
}

type RadioValuesType = RadioValues.money | RadioValues.points;

const labelText: Record<string, string> = {
  [RadioValues.money]: "edit money",
  [RadioValues.points]: "edit points",
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [typeSelected, setTypeSelected] = useState<RadioValuesType>(
    RadioValues.money,
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputValue("");
  };

  const handleRadioChange = (e: any) => {
    setTypeSelected(e.target.value);
    setInputValue("");
  };

  const handleMoneyFormat = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length <= 9) {
      let newValue = "";
      if (onlyDigits) {
        newValue = `R$ ${onlyDigits}`;
      }
      setInputValue(newValue);
    }
  };

  const handlePointsFormat = (value: string) => {
    if (value.length <= 9) {
      setInputValue(value);
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (typeSelected === RadioValues.money) {
      handleMoneyFormat(value);
    } else {
      handlePointsFormat(value);
    }
  };

  const getInputValueWidth = () => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    if (context) {
      let width = context.measureText(inputValue).width + 16;
      console.log("***[res]", Math.ceil(width) + "px");
      return Math.ceil(width) + "px";
    }
    return "0";
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* input with mask */}
        <div className="wrapper">
          <label htmlFor="input-mask">{labelText[typeSelected]}</label>
          <input
            type="string"
            id="input-mask"
            className="input"
            value={inputValue}
            onChange={handleChange}
          />
          {typeSelected === RadioValues.points && (
            <span
              className="suffix"
              style={{ left: `${getInputValueWidth()}` }}
            >
              pts
            </span>
          )}
        </div>
        {/* controls */}
        <fieldset>
          <div>
            <input
              id="radio-money"
              type="radio"
              name="maskType"
              value={RadioValues.money}
              onChange={handleRadioChange}
              checked={RadioValues.money === typeSelected}
            />
            <label htmlFor="radio-money">edit money</label>
          </div>
          <div>
            <input
              id="radio-points"
              type="radio"
              name="maskType"
              value={RadioValues.points}
              onChange={handleRadioChange}
              checked={RadioValues.points === typeSelected}
            />
            <label htmlFor="radio-points">edit points</label>
          </div>
        </fieldset>
        {/* button */}
        <button disabled={inputValue.length === 0}>confirmar</button>
      </form>
    </div>
  );
}

export default App;
