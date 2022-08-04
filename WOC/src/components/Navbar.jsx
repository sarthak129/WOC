import React from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let navigate = useNavigate();
  const handleLogOut = async (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.auth.setAuthStatus(false);
      props.auth.setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <nav className="flex flex-row items-center justify-between px-2 py-3 bg-cyan-600  lg-sticky">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {!props.auth.user && (
            <a
              className="text-xl font-bold font-satisfy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-red-300"
              href="/login"
            >
              WOC
            </a>
          )}
          {props.auth.user && (
            <a
              className="text-xl font-bold font-satisfy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-red-300"
              href="/home"
            >
              WOC
            </a>
          )}
        </div>
        {!props.auth.user && (
          <div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="text-xl font-bold font-satisfy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-red-300"
                  href="/login"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        )}
        {props.auth.user && (
          <div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <p className="text-xl font-bold font-satisfy leading-relaxed inline-block py-2 whitespace-nowrap text-white hover:text-red-300">
                  Hello {props.auth.user.username}
                </p>
                <a
                  className="text-xl font-bold font-satisfy leading-relaxed inline-block mr-1 py-2 whitespace-nowrap text-white hover:text-red-300 ml-10"
                  href="/leaderboard"
                >
                  Leaderboard
                </a>
                <a
                  onClick={handleLogOut}
                  className="text-xl font-bold font-satisfy leading-relaxed inline-block py-2 whitespace-nowrap text-white hover:text-red-300 ml-3"
                  href="/login"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
