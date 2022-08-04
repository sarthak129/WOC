import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    emailID: Yup.string().email().required("Enter your Email ID"),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  async function onSubmit({ emailID }) {
    try {
      await Auth.forgotPassword(emailID);
      toast.success("Code sent to registered Email ID");
      navigate("/reset");
    } catch (error) {
      toast.error("Enter registered Email ID");
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | Forgot</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2 w-full lg:w-96">
          <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
            Forgot Password
          </p>
          <label
            htmlFor="emailID"
            className="text-cyan-600 font-bold font-satisfy text-xl"
          >
            Enter registered email:
          </label>
          <input
            className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
            type="email"
            name="emailID"
            id="emailID"
            placeholder="Email"
            {...register("emailID")}
          />
          <p className="text-red-600">{errors.emailID?.message}</p>
          <button
            className="border-cyan-600 text-cyan-600 border-2 rounded-md font-bold text-xl font-sacramento hover:bg-cyan-600 hover:text-white p-2 mt-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
