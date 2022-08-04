import React from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Modal({
  isCorrect,
  turn,
  solution,
  user,
  startTime,
  endTime,
}) {
  useEffect(() => {
    console.log("in post");
    var data = JSON.stringify({
      userId: user,
      numberOfAttempts: turn,
      startTime: startTime,
      endTime: endTime,
    });

    var config = {
      method: "post",
      url: "https://2veqgi2nv3nfmzcmjofnbjizmy0piepo.lambda-url.us-east-1.on.aws/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="modal">
      {isCorrect && (
        <div className="flex flex-col items-center justify-center mt-3">
          <h1 className="text-xl font-bold text-cyan-600">You Win!!!</h1>
          <p className="text-xl font-bold text-cyan-600">
            You found the solution in {turn} guesses :)
          </p>
        </div>
      )}
      {!isCorrect && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-cyan-600">Nevermind</h1>
          <p className="text-xl font-bold text-cyan-600">
            Correct word is : {solution}
          </p>
          <p className="text-xl font-bold text-cyan-600">
            Better luck next time :)
          </p>
        </div>
      )}
    </div>
  );
}
