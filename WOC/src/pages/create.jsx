import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BounceLoader } from "react-spinners";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import NotFound from "./404";
import axios from "axios";

const Create = (props) => {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  const validationSchema = Yup.object().shape({
    hint: Yup.string().required("Provide a hint"),
    cword: Yup.string()
      .required("Use >=4 and <=10 characters for word")
      .matches(
        /^[A-Za-z]*$/,
        "Provide word which do not contain any special characters or spaces"
      )
      .max(15, "Use >=4 and <=10 characters for word")
      .min(4, "Use >=4 and <=10 characters for word"),
  });

  async function onSubmit({ hint, cword }) {
    var data = JSON.stringify({
      userId: props.auth.user.username,
      word: cword,
      hint: hint,
    });

    var config = {
      method: "post",
      url: "https://nuuowyw5boq7b2ufxgirlsh6pq0zssvm.lambda-url.us-east-1.on.aws/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLink(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const copy = () => {
    const el = document.createElement("input");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
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
          <title>Word On Cloud | CreateGame</title>
        </Helmet>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
            <div className="flex flex-col mb-4">
              <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
                Create Game
              </p>
              <label
                htmlFor="hint"
                className="text-cyan-600 font-satisfy font-bold text-xl"
              >
                Hint
              </label>
              <input
                className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
                type="text"
                name="hint"
                id="hint"
                placeholder="Provide Hint"
                {...register("hint")}
              />
              <p className="text-red-600">{errors.hint?.message}</p>
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="cword"
                className="text-cyan-600 font-bold font-satisfy text-xl"
              >
                Enter a Word
              </label>
              <input
                className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
                type="password"
                name="cword"
                id="cword"
                placeholder="Provide a word between 4 to 10 characters"
                {...register("cword")}
              />
              <p className="text-red-600">{errors.cword?.message}</p>
            </div>
            <button
              className="border-cyan-600 bg-cyan-50 text-cyan-600 hover:text-white hover:bg-cyan-600 border-2 rounded-md font-bold font-sacramento text-xl  mt-4 p-2 mb-5"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="flex flex-row items-center justify-center mt-3 font-satisfy font-bold text-xl">
          {link.substring(0, 50)}
          <button
            onClick={copy}
            className="ml-8 border-cyan-600 border-2 rounded-md font-bold font-sacramento text-lg bg-cyan-50 text-cyan-600 hover:text-white hover:bg-cyan-600 p-2"
            type="submit"
          >
            {!copied ? "Copy link" : "Copied!"}
          </button>
        </p>
      </div>
    );
  }
  if (!props.auth.user) {
    return <NotFound />;
  }
};

export default Create;
