import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import NotFound from "./404";

const Homepage = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
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
          <title>Word On Cloud | Home</title>
        </Helmet>
        <p className="font-lobster text-2xl text-center mb-5 text-cyan-600">
          Select
        </p>
        <div className="grid lg:grid-cols-2 lg:gap-80 items-center justify-center mt-36">
          <a href="/play" class="relative inline-block text-2xl group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-cyan-600 transition-colors duration-500 ease-out border-2 border-cyan-600 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-cyan-50"></span>
              <span class="absolute left-0 w-64 h-36 -ml-2 transition-all duration-700 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-cyan-600 group-hover:-rotate-180 ease"></span>
              <span class="relative font-blaka">Play a Game</span>
            </span>

            <span
              class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-cyan-600 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
          <a href="/create" class="relative inline-block text-2xl group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-cyan-600 transition-colors duration-500 ease-out border-2 border-cyan-600 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-cyan-50"></span>
              <span class="absolute left-0 w-64 h-36 -ml-2 transition-all duration-700 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-cyan-600 group-hover:-rotate-180 ease"></span>
              <span class="relative font-blaka">Create a Game</span>
            </span>
            <span
              class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-cyan-600 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
        </div>
      </div>
    );
  }
  if (!props.auth.user) {
    <NotFound />;
  }
  return <NotFound />;
};

export default Homepage;
