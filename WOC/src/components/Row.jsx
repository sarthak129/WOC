import React from "react";

export default function Row({ guess, currentGuess, solution }) {
  let solutionArray = solution.toString().split("");
  let result = solutionArray.map(() => <div className=""></div>);
  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <div key={i} className={l.color}>
            {l.key}
          </div>
        ))}
      </div>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(solutionArray.length - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      {result}
    </div>
  );
}
