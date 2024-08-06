import { useState } from "react";
import "./index.scss";
import { evaluate } from 'mathjs';

function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [theme, setTheme] = useState('root');
  const themes = ["root", "bright", "dark"];
  const [themeIndex,setThemeIndex] = useState(0);

  const toggleTheme = () => {
    setThemeIndex(prevIndex => {
      const newIndex = prevIndex === 2 ? 0 : prevIndex + 1;
      const newTheme = themes[newIndex];
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newIndex;
    });
    // setThemeIndex(themeIndex + 1);
    // setTheme(themes[themeIndex]);
    // document.documentElement.setAttribute('data-theme', theme);
    
    // if (themeIndex === 2){
    //   setThemeIndex(0);
    // }
  };

  const createNumber = (value) =>{
    if (value === "x"){
      value = "*"
    }

    const lastChar = displayValue[displayValue.length - 1];

    const regexForFirstValue = /[.0*\/+\-/]$/;

    if(displayValue.length === 0 && regexForFirstValue.test(value)){
      return;
    }


    // Regular expression to check if the last character is *, /, +, or -
    const regex = /[.*\/+\-/]$/;
    // To prevent operations in one for example "++"
    if (regex.test(lastChar) && regex.test(value)){
      return;
    }

    setDisplayValue(displayValue + value);
  }

  const calculateResult = () => {
      try {
        let res = evaluate(displayValue);
        res = res.toString();
        console.log(res);
        setDisplayValue(res);
      } catch (error) {
          setDisplayValue('Error');
      }
  }

  const deleteNumber = () =>{
    setDisplayValue(displayValue.slice(0, -1));
  }

  const reset = () => {
    setDisplayValue("");
  }

  return (
    <div className="App">
      <section>
        <div className="inner-container">
          <header>
            <h1 className="logo">calc</h1>
            <div className="color-switcher-container">
              <h6>THEME</h6>
              <div className={`switcher --${theme}`} onClick={toggleTheme}>
                <div className="ball"/>
              </div>
            </div>
          </header>
          <div className="calc-display">
            {displayValue}
          </div>
          <div className="keypad-container">
            <button className="button --number" onClick={() => createNumber("7")}><p>7</p></button>
            <button className="button --number" onClick={() => createNumber("8")}><p>8</p></button>
            <button className="button --number" onClick={() => createNumber("9")}><p>9</p></button>
            <button className="button --text --accent" onClick={deleteNumber}><p>DEL</p></button>
            <button className="button --number" onClick={() => createNumber("4")}><p>4</p></button>
            <button className="button --number" onClick={() => createNumber("5")}><p>5</p></button>
            <button className="button --number" onClick={() => createNumber("6")}><p>6</p></button>
            <button className="button --number" onClick={() => createNumber("+")}><p>+</p></button>
            <button className="button --number" onClick={() => createNumber("1")}><p>1</p></button>
            <button className="button --number" onClick={() => createNumber("2")}><p>2</p></button>
            <button className="button --number" onClick={() => createNumber("3")}><p>3</p></button>
            <button className="button --number" onClick={() => createNumber("-")}><p>-</p></button>
            <button className="button --number" onClick={() => createNumber(".")}><p>.</p></button>
            <button className="button --number" onClick={() => createNumber("0")}><p>0</p></button>
            <button className="button --number" onClick={() => createNumber("/")}><p>/</p></button>
            <button className="button --number" onClick={() => createNumber("x")}><p>x</p></button>
            <button className="button --big --text --accent" onClick={reset}><p>RESET</p></button>
            <button className="button --big --text --second-accent" onClick={calculateResult}><p>=</p></button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
