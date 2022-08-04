import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Reset = () => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required(
      "Enter valid code to reset password"
    ),
    emailID: Yup.string().email().required("Enter your Email ID"),
    password: Yup.string().required("Enter password for your account"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  async function onSubmit({ verificationCode, emailID, password }) {
    console.log(password);
    try {
      await Auth.forgotPasswordSubmit(emailID, verificationCode, password);
      navigate("/login");
      toast.success("Password Reset Successful");
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Verification Code or Email Id");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | Reset</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col mb-4">
            <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
              Reset Password
            </p>
            <label
              htmlFor="pswd"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Verification Code
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="text"
              name="verificationCode"
              id="verificationCode"
              placeholder="000000"
              {...register("verificationCode")}
            />
            <p className="text-red-600">{errors.verificationCode?.message}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="emailID"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Email
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="email"
              name="emailID"
              id="emailID"
              placeholder="Enter email"
              {...register("emailID")}
            />
            <p className="text-red-600">{errors.emailID?.message}</p>
          </div>
          <div className="flex flex-col mb-4">
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
              placeholder="New Password"
              {...register("password")}
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <button
            className="border-cyan-600 text-cyan-600 border-2 rounded-md font-bold font-sacramento text-xl hover:bg-cyan-600 hover:text-white mt-4 p-2"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
