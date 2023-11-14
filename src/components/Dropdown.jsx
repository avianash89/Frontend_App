import { useState, useEffect } from "react";
import "../components/dropdown.css";
import optionEx from "../data/option";


export default function Dropdown() {
  const [select, setSelect] = useState('');
  const [progress, setProgress] = useState(0);
  const [globalQuestionAndOptions, setGlobalQuestionAndOptions] = useState(null);
  const [goTrue, setGoTrue] = useState(false) 
  console.log(goTrue)

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
    setGoTrue(false)
  };


  const handleGoClick = () => {
    setProgress(0);
    setGoTrue(true)
    
 const interval = setInterval(() => {
  setProgress((prevProgress) => {
    if (prevProgress >= 100) {
      clearInterval(interval);
      return 100;
    }
    return prevProgress + 10;
  });
}, 100);
  };


  // progress Handler 
const progressHandler = () =>{


  
}

  useEffect(() => {
    // Reset progress when a new option is selected
    setProgress(0);
  }, [select]);

  // check if true than 

  // clicked on option button 
  useEffect(() => {
    const Question = optionEx.find((value) => value.ex === select);
    if (Question) {
      setGlobalQuestionAndOptions(Question.data.questionAndOptions);
    } else {
      console.log('No matching category found.');
    }
  }, [select]);

  return (
    <div className="dropdown-container">
      <div>
        {progress < 100 && (
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        )}
      </div>
      <div className="center-container">
        <div className="dropdown">
          <div className="dropdown-with-input">
            <div className="drop-search">
              <div className="item-drop">
                <select onChange={handleSelectChange} value={select}>
                  <option value="">Select an option</option>
                  {optionEx.map((value, index) => (
                    <option key={index} value={value.ex} >
                      {index + 1}-{value.ex}
                    </option>
                  ))}
                </select>
              </div>
              <input type="text" placeholder={select === "" ? 'enter your option' : select} />
            </div>
            <button className="go-btn" onClick={()=>{handleGoClick(),progressHandler()}}>
              Go
            </button>
          </div>

        </div>
        <div className="display-box">

          {
           goTrue == true ? globalQuestionAndOptions && (
              <div className="question-grid">
                {Object.keys(globalQuestionAndOptions).map((questionNumber, index) => {
                  const questionData = globalQuestionAndOptions[questionNumber];
                  return (
                    <div key={questionNumber}>
                      <p>{index + 1}-{questionData.question}</p>
                    </div>
                  );
                })}
              </div>
            ) : ""
          }

          <button className="start-quiz">start-quiz</button>
        </div>
      </div>
    </div>
  );
}
