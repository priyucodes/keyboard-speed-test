import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import randomWords from 'random-words';
const NUMOFWORDS = 200;
const SECONDS = 3;
function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(SECONDS);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);
  const [isIncorrect, setIsIncorrect] = useState(0);
  const [status, setStatus] = useState('Wating...');
  const inputRef = useRef(null);
  useEffect(() => {
    setWords(wordsGenerator());
    //
  }, []);
  useEffect(() => {
    if (status === 'started') {
      inputRef.current.focus();
    }
  }, [status]);
  const wordsGenerator = () => {
    return new Array(NUMOFWORDS).fill(null).map(() => randomWords());
  };
  const startHandler = () => {
    if (status === 'finished') {
      setWords(wordsGenerator());
      setCurrentWordIndex(0);
      setIsCorrect(0);
      setIsIncorrect(0);
    }
    if (status !== 'started') {
      setStatus('started');
      let interval = setInterval(() => {
        setTimer(prevState => {
          if (prevState === 0) {
            clearInterval(interval);
            setStatus('finished');
            setInput('');
            return SECONDS;
          } else {
            return prevState - 1;
          }
        });
      }, 1 * 1000);
    }
  };
  const keyDownHandler = ({ keyCode }) => {
    // 32- spacebar
    if (keyCode === 32 || keyCode === 13) {
      checkMatch();
      setInput('');
      setCurrentWordIndex(prevState => prevState + 1);
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[currentWordIndex];
    const isMatched = wordToCompare === input.trim();
    if (isMatched) {
      setIsCorrect(prevState => prevState + 1);
    } else setIsIncorrect(prevState => prevState + 1);
  };
  return (
    <Container>
      <h1>Test your typing speed </h1>
      <TimeContainer>
        <h3>{timer}</h3>
      </TimeContainer>
      {status === 'started' && (
        <WordContainer>
          {words.map((word, i) => (
            <span key={i}>
              <span>
                {word.split(' ').map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </span>
              <span> </span>
            </span>
          ))}
        </WordContainer>
      )}

      <Input
        disabled={status !== 'started'}
        rows="31"
        cols="50"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={keyDownHandler}
        ref={inputRef}
      ></Input>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          transform: 'translateX(3%)',
        }}
      >
        <ButtonReset onClick={startHandler}>Start</ButtonReset>
        <ButtonReset>Reset</ButtonReset>
      </div>

      {status === 'finished' && (
        <div stlye={{}}>
          <div>
            <p>Words per Minute: (WPM)</p>
            <p>{isCorrect}</p>
            <div>
              <p>Accuracy: </p>
              <p>
                {Math.round((isCorrect / (isCorrect + isIncorrect)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}

      <ButtonContainer>
        <ButtonTest>Test</ButtonTest>
        <ButtonRestart>Restart</ButtonRestart>
        <ButtonStyled>Style Button</ButtonStyled>
      </ButtonContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  /* text-align: center; */
  /* display: grid;
  place-items: center; */
  div {
    font-size: 1.6rem;
    margin-top: 5rem;
    width: 100%;
    padding: 1rem;
  }
  span {
    color: #fff;
    text-shadow: 2px 2px 5px #000;
    /* background: black; */
    /* word-break: break-all;
    word-wrap: break-word;
    text-align: justify; */
    /* -moz-hyphens: auto;
    -webkit-hyphens: auto;
    -o-hyphens: auto;
    hyphens: auto; */
  }
`;
const WordContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const TimeContainer = styled.div`
  color: cadetblue;

  text-align: center;
  h3 {
    font-size: 3rem;
    font-weight: bold;
  }
`;
const Input = styled.textarea`
  width: 50rem;
  height: 25rem;
  resize: none;
  margin-top: 30px;
  font-size: 20px;
  font-family: inherit;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  /* position: relative; */
`;
const ButtonReset = styled.a`
  padding: 1.5rem 3rem;
  outline: none;
  margin-right: 15rem;

  /* border-image: linear-gradient(to right, royalblue, green, blue); */
  /* border-image: linear-gradient(-45deg, royalblue, cyan);

  border-image-slice: 4;
  border-image-width: 0.2em; */
  /* color: hsl(317 100% 54%); */
  color: cyan;
  font-size: 3rem;
  /* background: hsl(323 21% 16%); */
  background: transparent;
  display: inline-block;
  cursor: pointer;
  border: solid 4px cyan;
  text-shadow: 0 0 0.125em white, 0 0 0.5em currentColor;

  /* inset adds shadow inside the element */
  box-shadow: 0 0.1em 0.5em 0 royalblue, inset 0 0 0.5em 0 cyan;
  margin-top: 3rem;
  border-radius: 10px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    background: cyan;
    top: 120%;
    left: 0;
    /* or can use transform translate with it */
    /* right: 0;
    bottom: 0; */
    /* advantage can change top or left */
    width: 100%;
    height: 100%;

    /* how far away we are from the thing/element */
    /* first perspective then other properties */
    /* if theres no perspective u cant rotate everything would look the same */
    /* the smaller the number the close we are  */
    /* if higher number means we looking from far distant */
    transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
    filter: blur(1em);
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 2rem 1rem cyan;
    opacity: 0;
    background-color: cyan;
    z-index: -1;
    transition: opacity 0.1s linear;
  }
  &:hover,
  :focus {
    background: cyan;
    color: #1d1d1d;
    text-shadow: none;
    transform: translateY(-5px);
  }
  &:active {
    transform: translateY(0);
  }
  &:hover::before,
  &:focus::before,
  &:hover::after,
  &:focus::after {
    opacity: 1;
  }
`;

const ButtonTest = styled.a`
  position: absolute;
  font-size: 2rem;
  top: 100px;
  left: 0;
  background-image: linear-gradient(
    to right,
    #1a2980 0%,
    #26d0ce 51%,
    #1a2980 100%
  );
  margin: 10px;
  padding: 15px 60px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

const ButtonRestart = styled.a`
  /* position: relative; */
  position: absolute;
  top: 0;
  left: 0;
  font-size: 2rem;
  padding: 1.5rem 3rem;
  margin: 11px;
  background: transparent;
  color: #fff;
  text-decoration: none;
  letter-spacing: 1px;
  border: 1px solid #1d1d1d;
  transition: 0.6s;
  overflow: hidden;
  &:hover {
    background: #1d1d1d;
  }
  &:nth-child(2):hover {
    /* background: pink; */
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(90deg, transparent, #fff);

    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;
const ButtonStyled = styled.a`
  position: absolute;
  bottom: 100px;
  font-size: 2rem;
  padding: 2rem 4rem;
  border: dotted 2px goldenrod;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(-90deg, white, #1d1d1d);
    z-index: -1;
    animation: shine 1s ease-out infinite;
  }
  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  &:hover::before {
    left: 100%;
  }
  &:hover {
    background: goldenrod;
    z-index: -2;
  }
`;
