import { useState, useRef, useEffect } from "react";

const useWordGame = (startingTime = 10) => {
  const [typedWords, setTypedWords] = useState("");
  const [timer, setTimer] = useState(startingTime);
  const [toggle, setToggle] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const inputRef = useRef(null);

  const [highScore, setHighScore] = useState(() => {
    const localHighstore = localStorage.getItem("highscore");

    if (localHighstore) {
      return JSON.parse(localStorage.getItem("highscore"));
    } else {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem("highscore", JSON.stringify(highScore));
  }, [highScore]);

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
    setTimer(startingTime);
    setTypedWords("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const endGame = () => {
    setWordsCount(handleCountWords(typedWords));
    setToggle(false);
    calculateHighScore();
  };

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
