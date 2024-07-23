import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      console.log("Error:", error);
      //   alert(error.response?.data?.message || "Something went wrong!");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-[90%] md:w-[65%] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
      <form onSubmit={handleMessage} className="space-y-4">
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="firstName"
              className="text-left block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              className="px-2 text-sm border border-gray-500 inline-block w-full py-3"
              type="text"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 w-full ">
            <label
              htmlFor="lastName"
              className="  text-sm text-left block  font-medium text-gray-700"
            >
              Last Name:
            </label>
            <input
              className=" px-2 text-sm border border-gray-500 inline-block w-full py-3"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="email"
              className="text-left block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              className=" px-2 text-sm border border-gray-500 inline-block w-full py-3"
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="phoneNumber"
              className="text-left block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              className="w-full px-2 text-sm  border border-gray-500 inline-block  py-3"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="message"
              className=" text-left block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-2 border border-gray-500 inline-block py-3"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
