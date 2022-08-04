import React from "react";
import Row from "./Row";

export default function Grid({ guesses, currentGuess, turn, solution}) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} solution={solution}/>;
        }
        return <Row key={i} guess={g} solution={solution}/>;
      })}
    </div>
  );
}
