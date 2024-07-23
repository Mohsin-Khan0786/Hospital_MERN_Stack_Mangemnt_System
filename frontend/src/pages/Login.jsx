import React, { useContext, useState } from "react";
import { Context } from "../main";
import { useNavigate, Navigate } from "react-router-dom"; // Import Navigate component
import axios from "axios";
import { toast } from "react-toastify"; // Make sure toast is imported
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Destructure context correctly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Use correct naming convention

  const handleLogin = async (e) => {
    e.preventDefault(); // Fix typo here
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, confirmedpassword, role: "Patient" }, // Fix payload to be an object
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/"); // Use navigate function here
    } catch (error) {
      toast.error(error.response.data.message);
      alert("NOt working");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />; // Use Navigate component here
  }

  return (
    <div className="flex justify-center items-center h-screen">
     <div className="w-96 p-6 shadow-lg bg-white rounded "> 
      <h2 className="mt-10 text-center text-2xl font-bold ">Sign In</h2>
      <p>Please Log In to Continue</p>
      <hr className="mt-3"/>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block text-sm text-left">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="border w-full inline-block px-2 text-sm py-3 border-gray-500  "
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          required
          
        />
        <label className="text-left block text-sm">Password:</label>
        <input className="border w-full  inline-block px-2 text-sm py-3 border-gray-500  "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="text-left block text-sm ">ConfirmedPassword:</label>
        <input
          type="password"
          className="border w-full inline-block px-2 text-sm py-3 border-gray-500 "
          placeholder="Confirm Password"
          value={confirmedpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-[100px] h-[45px] rounded text-white bold hover:bg-blue-800  bg-blue-500">Log In</button>
        <p>
          Don't have an account? <a href="/register">Register Here</a>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
