import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase/firebase.config";

import { motion } from "framer-motion";

import { useStateValue } from "../../context/stateContext";
import { actionType } from "../../context/reducer";

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";

import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar.png";

function Header() {
  const auth = getAuth(app); // initializing firebase authentication
  const provider = new GoogleAuthProvider(); // initializing the auth provider

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  // login with google popup
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      // saving user in local storage to persist user
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  // logout user
  const logout = () => {
    setIsMenu(false); // hide the dropdown
    localStorage.clear(); // clear the user from local storage
    // set user to null in the reducer
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="w-screen fixed z-50 p-3 px-4 md:p-4 md:px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="px-4 py-2 flex items-center gap-8"
          >
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
          </div>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-12"
            >
              {user && user.email === "bwambura3314@gmail.com" && (
                <Link to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <p
                onClick={logout}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 text-textColor text-base"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            rel="no-referrer"
            onClick={login}
          />
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
          >
            {user && user.email === "bwambura3314@gmail.com" && (
              <Link to="/createItem">
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 text-textColor text-base">
                  New Item <MdAdd />
                </p>
              </Link>
            )}
            <ul className="flex flex-col">
              <li className="px-4 py-2 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100">
                Home
              </li>
              <li className="px-4 py-2 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100">
                Menu
              </li>
              <li className="px-4 py-2 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100">
                About Us
              </li>
              <li className="px-4 py-2 text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100">
                Service
              </li>
            </ul>
            <p
              onClick={logout}
              className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 text-textColor text-base"
            >
              Logout <MdLogout />
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default Header;
