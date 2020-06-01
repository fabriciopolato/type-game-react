import { useState, useRef, useEffect } from "react";

const useWordGame = () => {
  const STARTING_TIME = 10;

  const [typedWords, setTypedWords] = useState("");
  const [timer, setTimer] = useState(STARTING_TIME);
  const [toggle, setToggle] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const inputRef = useRef(null);

  const handleChange = (event) => {
    setTypedWords(event.target.value);
  };

  const handleCountWords = (text) => {
    const wordsArr = text.split(" ");
    return wordsArr.filter((word) => word !== "").length;
  };

  const blockPaste = (event) => {
    event.target.addEventListener("paste", (e) => {
      e.preventDefault();
      return false;
    });
  };

  const calculateHighScore = () => {
    if (wordsCount > highScore) {
      setHighScore(wordsCount);
    }
  };

  const startGame = () => {
    setToggle(true);
    setTimer(STARTING_TIME);
    setTypedWords("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const endGame = () => {
    setWordsCount(handleCountWords(typedWords));
    setToggle(false);
    calculateHighScore();
  };

  useEffect(() => {
    if (timer > 0 && toggle) {
      setWordsCount(0);
      setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, toggle]);

  return {
    inputRef,
    toggle,
    handleChange,
    typedWords,
    blockPaste,
    timer,
    startGame,
    highScore,
    wordsCount,
  };
};

export default useWordGame;
