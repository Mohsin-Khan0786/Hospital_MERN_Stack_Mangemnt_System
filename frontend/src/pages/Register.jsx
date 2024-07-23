import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this line is included

const Register = () => {
  const { isAuthenticated, setIsAuthenticated,setUser} = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setdob] = useState("");
  const [nic, setnic] = useState("");
  

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { 
          firstName, 
          lastName, 
          email, 
          phone: "03211234567", 
          gender, 
          password, 
          dob, 
          nic,
          role: "Patient" 
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      if (response.data.success) {
        setIsAuthenticated(true);
        toast.success(response.data.message); // Use response instead of res
        navigate("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setGender("");
        setPassword("");
        setdob("");
        setnic("");
        setUser(response.data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log("Error:", error);
    }
  };
  
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex justify-center items-center h-screen mt-[10%]">
      <div className="w-full max-w-md p-8 shadow-lg bg-white rounded">
        <h2 className="text-center font-bold text-2xl mb-4">Sign Up</h2>
        <hr className="mb-4" />
        <p className="text-center mb-4">
          Please fill in this form to create an account.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-left">First Name:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">Last Name:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">Email:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">Password:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">NIC:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="text"
              value={nic}
              onChange={(e) => setnic(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">Date of Birth:</label>
            <input
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              type="date"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-left">Gender:</label>
            <select
              className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="w-full">
            <input
              type="submit"
              value="Register"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
