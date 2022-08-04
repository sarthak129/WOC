import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>Word On Cloud | 404</title>
      </Helmet>
      <h1 className="text-5xl text-center mt-10 mb-8 text-cyan-600 font-lobster">
        404 Error Page Not Found
      </h1>
      <div className="justify-center items-center flex flex-row font-semibold">
        <Link to="/login" passHref>
          <span className="hover:text-red-300 cursor-pointer text-cyan-600 font-satisfy">
            Back to Home Page
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
