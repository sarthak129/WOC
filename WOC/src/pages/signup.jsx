import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Signup = () => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Provide a user name"),
    firstName: Yup.string().required("Enter your first name"),
    lastName: Yup.string().required("Enter your last name"),
    emailID: Yup.string().email().required("Enter your Email ID"),
    pswd: Yup.string().required("Create a password for your account"),
    confirmpassword: Yup.string().oneOf([Yup.ref("pswd"), null]),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  async function onSubmit({ userName, pswd, emailID }) {
    console.log(userName);
    try {
      const signUpResponse = await Auth.signUp({
        username: userName,
        password: pswd,
        attributes: {
          email: emailID,
        },
      });
      toast.success("Verification lisk sent to registerd emailID.");
      setTimeout(navigate("/login"), 2000);
      console.log(signUpResponse);
    } catch (error) {
      toast.error("Username Already Exists");
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | Signup</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col mb-2">
            <p className="font-lobster text-2xl text-center mb-5 text-cyan-600 font-bold">
              Signup
            </p>
            <label
              htmlFor="userName"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              User Name
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter User Name"
              {...register("userName")}
            />
          </div>
          <p className="text-red-600">{errors.userName?.message}</p>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="firstName"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              First Name
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              {...register("firstName")}
            />
          </div>
          <p className="text-red-600">{errors.firstName?.message}</p>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="lastName"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Last Name
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              {...register("lastName")}
            />
            <p className="text-red-600">{errors.lastName?.message}</p>
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
          <div className="flex flex-col mb-2">
            <label
              htmlFor="pswd"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Password
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="password"
              name="pswd"
              id="pswd"
              placeholder="Enter Password"
              {...register("pswd")}
            />
            <p className="text-red-600">{errors.pswd?.message}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="confirmpassword"
              className="text-cyan-600 font-bold font-satisfy text-xl"
            >
              Confirm Password
            </label>
            <input
              className="bg-cyan-50 outline-none p-2 rounded-lg border-2 border-cyan-600 font-satisfy"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm password"
              {...register("confirmpassword")}
            />
            <p className="text-red-600">
              {errors.confirmpassword &&
                "Passwords didn’t match. Please try again."}
            </p>
          </div>
          <button
            className="border-cyan-600 text-cyan-600 border-2 rounded-md font-bold font-sacramento text-xl hover:bg-cyan-600 hover:text-white mt-4 p-2"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
