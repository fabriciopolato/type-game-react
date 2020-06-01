import React from "react";
import useWordGame from "./hooks/useWordGame";

function App() {
  const {
    inputRef,
    toggle,
    handleChange,
    typedWords,
    blockPaste,
    timer,
    startGame,
    highScore,
    wordsCount,
  } = useWordGame();

  return (
    <>
      <h1>How fast do you type?</h1>
      <textarea
        ref={inputRef}
        disabled={!toggle}
        onChange={handleChange}
        value={typedWords}
        onFocus={blockPaste}
      />
      <h4>Time Remaining: {timer}</h4>
      <button disabled={toggle} onClick={startGame}>
        START
      </button>
      <h4>Highscore: {highScore}</h4>
      <h4>count: {wordsCount}</h4>
    </>
  );
}

export default App;
