import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import NotFound from "./404";
import axios from "axios";

const Leader = (props) => {
  const [userdata, setUserdata] = useState([]);
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
      userId: props.auth.user.username,
    });

    var config = {
      method: "post",
      url: "https://klzgqazi7gwydgil3oumyl5v5u0fhcub.lambda-url.us-east-1.on.aws/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setUserdata(response.data);
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
          <title>Word On Cloud | Leaderboard</title>
        </Helmet>
        <div className="justify-center text-center">
          <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
            Leaderboard
          </p>
          <table className="text-xl border-8 mt-10 text-cyan-600">
            <tr className="h-10">
              <th className="font-satisfy w-28">Rank</th>
              <th className="font-satisfy w-28">Name</th>
              <th className="font-satisfy w-28">Points</th>
            </tr>
            {userdata.map((val, key) => {
              if (props.auth.user.username === val.user) {
                return (
                  <tr key={key} className="border-2 h-14 bg-cyan-300">
                    <td className="font-pacifico">{val.rank}</td>
                    <td className="font-pacifico">{val.user}</td>
                    <td className="font-pacifico">{val.score}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={key} className="border-2 h-14">
                    <td className="font-pacifico">{val.rank}</td>
                    <td className="font-pacifico">{val.user}</td>
                    <td className="font-pacifico">{val.score}</td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      </div>
    );
  }
  if (!props.auth.user) {
    <NotFound />;
  }
  return <NotFound />;
};

export default Leader;
