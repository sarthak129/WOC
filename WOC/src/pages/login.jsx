import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Login = (props) => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Enter your Email ID"),
    password: Yup.string().required("Enter your Password"),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  async function onSubmit({ email, password }) {
    try {
      const user = await Auth.signIn(email, password);
      navigate("/home");
      props.auth.setAuthStatus(true);
      props.auth.setUser(user);
    } catch (error) {
      toast.error("Incorrect Email & Password");
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | Login</title>
      </Helmet>
      <div className="justify-center text-center mb-5 text-cyan-600 text-xl font-pacifico">
        <Typewriter
          options={{
            strings: [
              "Want to play Word Game?",
              "Login below to guess the word and beat your friends",
              "Don't have account?",
              "Click on Signup link to create an account",
            ],
            autoStart: true,
            loop: true,
            delay: 4,
            deleteSpeed: 4,
          }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col">
            <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
              Login
            </p>
            <label
              htmlFor="email"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Username
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="text"
              name="email"
              id="email"
              placeholder="Username"
              {...register("email")}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Password
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <button
            className="border-cyan-600 text-cyan-600 border-2 rounded-md font-bold font-sacramento text-xl hover:bg-cyan-600 hover:text-white mt-4 p-2"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-row justify-between font-bold text-cyan-600 font-satisfy">
            <Link to="/forgot">
              <span className="hover:text-red-300 cursor-pointer">
                Forgot Password?
              </span>
            </Link>
            <Link to="/signup">
              <span className="hover:text-red-300 cursor-pointer text-cyan-600">
                Signup
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
