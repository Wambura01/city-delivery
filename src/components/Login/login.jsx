import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useStateValue } from "../../context/stateContext";
import { actionType } from "../../context/reducer";

const auth = getAuth();

export default function Login() {
  const [isLogged, setIsLogged] = useState(false);
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // initializing the auth provider
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is mandatory"),
    password: Yup.string()
      .required("Password is mendatory")
      .min(3, "Password must be at 3 char long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4));
    signInWithEmailAndPassword(auth, data.email, data.password).then(
      (userCredential) => {
        console.log("logged in successfully!", userCredential);
        localStorage.setItem("user", JSON.stringify(userCredential));
        if (userCredential) {
          setIsLogged(!isLogged);
          navigate("/home", { replace: true });
        } else {
          console.log("Wrong Credentials!");
        }
      }
    );

    reset();

    return false;
  }

  // login with google popup
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      // saving user in local storage to persist user
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      navigate("/home", { replace: true });
    } else {
      setIsMenu(!isMenu);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-orange-600 uppercase">
          Sign in
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email")}
              className="block w-full px-4 py-2 mt-2 text-orange-600 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="text-red-700">{errors.email?.message}</div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password")}
              className="block w-full px-4 py-2 mt-2 text-orange-600 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="text-red-700">{errors.password?.message}</div>
          <a href="#" className="text-xs text-orange-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
              Login
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div
          onClick={login}
          className="flex items-center justify-center mt-4 gap-x-2"
        >
          <button
            type="submit"
            className="flex items-center justify-center w-[10rem] p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-600">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-orange-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
