import React, { useState } from "react";
import "./App.css";
import {
  getDigitsOnly,
  getInputValueWidth,
  getValueFormattedInBrazilianCurrency,
  getValueFormattedThousands,
} from "./utils";
import Toast from "./components/Toast";

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
  const [showToast, setShowToast] = useState(false);
  const [typeSelected, setTypeSelected] = useState<RadioValuesType>(
    RadioValues.money,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);
    setInputValue("");
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as RadioValuesType;
    setTypeSelected(value);
    setInputValue("");
  };

  const handleMoneyFormat = (value: string) => {
    const onlyDigits = getDigitsOnly(value);
    if (onlyDigits.length <= 9) {
      setInputValue(`R$ ${getValueFormattedInBrazilianCurrency(onlyDigits)}`);
    }
  };

  const handlePointsFormat = (value: string) => {
    const onlyDigits = getDigitsOnly(value);
    if (onlyDigits.length <= 9) {
      setInputValue(getValueFormattedThousands(onlyDigits));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    typeSelected === RadioValues.money
      ? handleMoneyFormat(value)
      : handlePointsFormat(value);
  };

  const showSuffix = () => {
    return typeSelected === RadioValues.points && inputValue.length > 0;
  };

  const isDisabled = () => {
    return parseInt(getDigitsOnly(inputValue)) === 0 || inputValue === "";
  };

  const turnOffToast = () => {
    setShowToast(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Input mask example</h1>
        <div className="wrapper">
          <label htmlFor="input-mask" className="label">
            {labelText[typeSelected]}
          </label>
          <input
            type="text"
            id="input-mask"
            className="input"
            value={inputValue}
            onChange={handleChange}
          />
          {showSuffix() && (
            <span
              className="suffix"
              style={{ left: `${getInputValueWidth(inputValue)}` }}
            >
              {inputValue === "1" ? "pt" : "pts"}
            </span>
          )}
        </div>
        <fieldset className="radios-wrapper">
          <div className="radio-content">
            <input
              id="radio-money"
              type="radio"
              name="maskType"
              value={RadioValues.money}
              onChange={handleRadioChange}
              checked={RadioValues.money === typeSelected}
            />
            <label htmlFor="radio-money" className="radio-content__label">
              edit money
            </label>
          </div>
          <div className="radio-content">
            <input
              id="radio-points"
              type="radio"
              name="maskType"
              value={RadioValues.points}
              onChange={handleRadioChange}
              checked={RadioValues.points === typeSelected}
            />
            <label htmlFor="radio-points" className="radio-content__label">
              edit points
            </label>
          </div>
        </fieldset>
        <button disabled={isDisabled()} className="confirm-button">
          confirmar
        </button>
        {showToast && <Toast text={`value submited!`} turnOff={turnOffToast} />}
      </form>
    </div>
  );
}

export default App;
