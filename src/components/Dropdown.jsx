import React, { useState, useEffect } from "react";
import "../components/dropdown.css";

export default function Dropdown() {
  const [select, setSelect] = useState('');
  const [progress, setProgress] = useState(0);
  const optionEx = [
    { ex: "tracker question" },
    { ex: "option question" },
    { ex: "etc question" },
    { ex: "tracker question" },
    { ex: "tracker question" }
  ];

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  const handleGoClick = () => {
    setProgress(0); // Reset progress
    // Increment the progress every 100ms until it reaches 100%
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);
  };

  useEffect(() => {
    // Reset progress when a new option is selected
    setProgress(0);
  }, [select]);

  return (
    <div className="dropdown-container">
      <div className="center-container">
        <div className="dropdown">
          <div className="dropdown-with-input">
            <div className="drop-search">
              <div className="item-drop">
                <select onChange={handleSelectChange} value={select}>
                  <option value="">Select an option</option>
                  {optionEx.map((value, index) => (
                    <option key={index} value={value.ex}>
                      {value.ex}
                    </option>
                  ))}
                </select>
              </div>
              <input type="text" value={select} readOnly placeholder="Select an option" />
            </div>
            <button className="go-btn" onClick={handleGoClick}>
              Go
            </button>
          </div>
          {progress < 100 && (
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          )}
        </div>
        <div className="display-box">
          <button className="start-quiz">start-quiz</button>
        </div>
      </div>
    </div>
  );
}
