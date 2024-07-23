import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handlelogOut = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const gotologin = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav className="p-3 flex bg-white justify-between items-center relative">
        <a href="/" className="flex gap-2 items-center">
          <img
            className="object-cover max-w-12 max-h-12"
            src={"/logo.png"}
            alt="Logo"
          />
          <span className="text-lg font-medium">MohsinCare</span>
        </a>
        <div className="flex justify-around md:w-1/2 items-center">
          <div className={`${toggle ? "flex" : "hidden"} md:flex gap-9 flex md:flex-row flex-col absolute md:static top-[100px] py-5 md:py-0 bg-white md:bg-transparent w-full md:w-auto right-0`}>
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
            <Link
              to="/appointment"
              className="text-gray-600 hover:text-gray-800"
            >
              Appointment            </Link>
            
          </div>
          <div
            className="md:hidden"
            toggle={toggle}
            onClick={() => setToggle(!toggle)}
          >
            <Hamburger size={17} />
          </div>
          {isAuthenticated ? (
            <button
              onClick={handlelogOut}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={gotologin}
              className="w-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
