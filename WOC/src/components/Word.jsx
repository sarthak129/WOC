import React, { useEffect, useState } from "react";
import useWord from "../hooks/useWord";
import Grid from "./Grid";
import Modal from "./Modal";

export default function Word({ solution, user }) {
  console.log(solution);
  const[endTime, setEndTime] = useState(0);
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, startTime } =
    useWord(solution);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setEndTime(Math.floor(new Date().getTime() / 1000));
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setEndTime(Math.floor(new Date().getTime() / 1000));
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div>{solution}</div> */}
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
        solution={solution}
      />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          user={user}
          startTime={startTime}
          endTime={endTime}
        />
      )}
    </div>
  );
}
