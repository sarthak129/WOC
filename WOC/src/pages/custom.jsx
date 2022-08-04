import React from "react";
import { Helmet } from "react-helmet";
import jwt from "jwt-decode";
import Word from "../components/Word";

const Custom = (props) => {
  const object = jwt(props.token);
  const word = object.word;
  const hint = object.hint;

  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | CustomGame</title>
      </Helmet>
      <h1 className="font-lobster text-2xl text-cyan-600">Guess the word!!</h1>
      <h2 className="font-lobster text-2xl text-cyan-600">
        Here is the hint: {hint}
      </h2>
      {word && <Word solution={word.toLowerCase()} />}
    </div>
  );
};

export default Custom;
