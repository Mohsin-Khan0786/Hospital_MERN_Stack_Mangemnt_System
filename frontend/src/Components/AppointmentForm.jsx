import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);


  const departmentArray = [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "Dermatology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "ENT",
  ];
  const navigate=useNavigate('')
  const [doctors, setDoctors] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/doctors", {
          withCredentials: true,
        });
        setDoctors(res.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment =async (e) => {
    e.preventDefault();
   
    try {
      const hasVisitedBool=Boolean(hasVisited)
      const {data}=await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          gender,
          dob,
          nic,
         appointment_date: appointmentDate,
          department,
          doctor_firstName:doctorFirstName,
          doctor_lastName:doctorLastName,
        
          address,
          hasVisited:hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      toast.success(data.message);
      navigate('/appointment')
      
      


      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen mt-[10%]">
        <div className="w-full max-w-md p-8 shadow-lg bg-white rounded">
          <h2 className="text-center font-bold text-2xl mb-4">Appointment</h2>
          <hr className="mb-4" />
          <p className="text-center mb-4">
            Please fill in this form to make an appointment.
          </p>

          <form onSubmit={handleAppointment} className="space-y-4">
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
              <label className="block text-sm text-left">NIC:</label>
              <input
                className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-left">Date of Birth:</label>
              <input
                className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-left">
                Appointment Date:
              </label>
              <input
                type="date"
                placeholder="Appointment Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-left">Department:</label>
              <select
                className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
                required
              >
                <option value="">Select Department</option>
                {departmentArray.map((dep, index) => (
                  <option key={index} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-left">Doctor:</label>
              <select
                className="border w-full px-3 text-sm py-2 border-gray-300 rounded"
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.department === department)
                  .map((doctor, index) => (
                    <option
                      key={index}
                      value={`${doctor.firstName} ${doctor.lastName}`}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-left">Address:</label>
              <textarea
                className="border w-full px-3 py-2 border-gray-300 rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="submit"
                value="Register"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 cursor-pointer"
              />
            </div>

            <div className="text-center">
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
              />{" "}
              <span className="ml-2">I have visited before</span>
            </div>

            <button type="submit" className="text-center">
              <Link
                to="/appointment"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                Get My Appointments
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
