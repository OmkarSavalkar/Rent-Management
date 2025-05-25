"use client";
import React, { useState } from "react";
import Dashboard from "../../dashboard/page";

const Login = () => {
  const systemPassword = 1030;
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginClicked = () => {
    if (password === String(systemPassword)) {
      setIsError(false);
      setIsLoggedIn(true);
    } else {
      setIsError(true);
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/house.jpg')] flex items-center justify-center">
      {/* ----- Dashboard ----- */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-blue-50 transition-opacity duration-800 ease-in-out ${
          isLoggedIn ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Dashboard />
      </div>

      {/* ----- Login ----- */}
      <div
        className={`absolute w-full max-w-sm transition-opacity duration-700 ease-in-out ${
          isLoggedIn ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="backdrop-blur-md border border-white/60 shadow-2xl rounded-xl px-8 py-10 w-full">
          <h2 className="text-2xl font-semibold text-white text-center mb-6 drop-shadow-lg">
            <img
              src="/home-pay.png"
              className="mx-auto w-[60px] mb-4"
              alt="house-logo"
            />
            Savali Niwas
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginClicked();
            }}
          >
            <div className="relative z-0 w-full mb-2 group">
              <input
                type="password"
                value={password}
                onChange={passwordChanged}
                className={`block py-2.5 px-0 w-full text-white border-0 border-b-2 ${
                  isError ? "border-red-500" : "border-white"
                } focus:outline-none peer placeholder-transparent`}
                placeholder="Password"
                required
              />
              <label className="absolute text-white text-md duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>

            <p
              className={`text-center text-red-500 text-sm mb-4 transition-opacity duration-300 ${
                isError ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Incorrect password. Please enter again!
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-300 text-white font-semibold py-1.5 rounded-lg shadow-lg hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
