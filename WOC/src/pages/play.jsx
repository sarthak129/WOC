import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import Word from "../components/Word";
import NotFound from "./404";

const Play = (props) => {
  const [solution, setSolution] = useState(null);
  const [status, setStatus] = useState(200);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  if (props.auth.user) {
    var data = JSON.stringify({
      type: "default",
      user: props.auth.user.username,
    });

    var config = {
      method: "post",
      url: "https://f725az2mi2apho7gcu7voakmui0kkegc.lambda-url.us-east-1.on.aws/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setStatus(response.status);
        console.log(status);
        if (status === 200) {
          setSolution(response.data.word);
        } else {
          setSolution(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <BounceLoader size={72} color="cyan" />
      </div>
    );
  }
  if (props.auth.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Helmet>
          <title>Word On Cloud | PlayGame</title>
        </Helmet>
        <h1 className="font-lobster text-2xl text-cyan-600 mb-5">
          Guess the word!!
        </h1>
        {solution && (
          <Word solution={solution} user={props.auth.user.username} />
        )}
        {!solution && (
          <div>
            <h1 className="mt-10 font-lobster text-2xl text-cyan-600">
              You have already played the game, please try to guess the new word
              next day.
            </h1>
          </div>
        )}
      </div>
    );
  }
  if (!props.auth.user) {
    return <NotFound />;
  }
};

export default Play;
