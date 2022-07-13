import { waitForElementToBeRemoved } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import React, {useEffect, useState} from 'react';
import './App.css';

type ButtPro={
  label:string;
  click:()=>void;
}


const StartBut:React.FC<ButtPro> = ({label, click}) => {
  return (
    <button type="button" onClick={click}>
      {label}
    </button>
  )
}



var enter=false;

const waitperiod=5000;

const myRandomNum = () => Math.ceil(Math.random()*10);
function App() {

  const [isRunning, setRunning]=useState(false);
  const [nextNum,setNextNum]=useState(myRandomNum());
  const [message, setMessage]=useState("");
  const [guessRight, setGuessRight]=useState(0); // 1 means right. 0 no guess, -1 wrong


  useEffect(()=>{
    console.log("in useEffect");

    if(!enter) {
      enter=true;
      setInterval(()=>{
        setNextNum(myRandomNum());
      },waitperiod);
    }
  },[]);


  const makePromise = () => {
    setGuessRight(0);
    if(!isRunning) {
      setMessage("You need to start so I can make an promise");
      return;
    }
    setMessage("I promise next number will be an EVEN number");

    const guessRight=(val:string) => {
      setMessage(val)
      setGuessRight(1);
    }
    const guessWrong = (val:string) => {
      setMessage(val);
      setGuessRight(-1);

    }

    const myPromise = new Promise(async function(resolve, reject) {

      await new Promise(resolve => setTimeout(resolve, waitperiod));

      if ((nextNum % 2 )===0) {
        resolve(`The number is ${nextNum} and I fulfiled my promise.`);
      } else {
        reject(`The number is ${nextNum} and I failed my promise.`);
      }
    });
    
    myPromise.then(
      function(val) {guessRight(val as string);},
      function(error) {guessWrong(error);}
    );    



  }

  const startRunning=()=>{
    setRunning(true);
    setMessage("Now you can make 1 promise.");
    setGuessRight(0);

  }
  
  const stopRunning=()=>{
    setRunning(false);
    setMessage("");
    setGuessRight(0);

  }
  

  return (
    <div className="App">
      <h2>Try to understand promise</h2>
      {isRunning? <StartBut label={'Stop'} click={stopRunning}/>:
      <StartBut label={'Start'} click={startRunning} />
      }
      <h4>Next Number is: {isRunning?nextNum:""}</h4>
      <StartBut label={'Promise'} click={makePromise} />

      <h2><div className={guessRight===0?"normalMsg":guessRight>0?"rightMsg":"wrongMsg"}>
        {message}</div></h2>
    </div>
  );
}

export default App;
