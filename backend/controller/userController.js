import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import User from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errormiddlewares.js";
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,//phone number required
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
    return next(new ErrorHandler("Please fill full form. All fields are required", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });

  generateToken(user, "User registered successfully", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmedpassword, role } = req.body;


  if (!email || !password || !confirmedpassword) {
    return next(new ErrorHandler("Please fill full form. All fields are required", 400));
  }
  if (password !== confirmedpassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // if (role !== user.role) {
  //   return next(new ErrorHandler("You do not have the required role", 403));
  // }

  generateToken(user, "User logged in successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || req.body.role !== "Admin") {
    return next(new ErrorHandler("Please fill full form. All fields are required", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "Admin registered successfully",
    admin
  });
});
export const getAllDocters=catchAsyncErrors(async(req,res,next)=>{
  const doctors=await User.find({role:"Doctor"});
  res.status(200).json({success:true,

    doctors});
});
 export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  const doctor=await User.find({role:"Doctor"});
  // if(!doctor){
  //   return next(new ErrorHandler("Doctor not found",404));
  // }
  res.status(200).json({success:true,
    doctor});
});
 export const getPatientDetails=catchAsyncErrors(async(req,res,next)=>{
  const patient=await User.find({role:"Patient"});
  // if(!patient){
  //   return next(new ErrorHandler("Patient not found",404));
  // }
  res.status(200).json({success:true,
    patient});
});
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("admintoken", "", {
      expires: new Date(Date.now()),
      httpOnly: true
  }).json({
      success: true,
      message: "Admin logged out successfully"
  });
});
export const logoutpatient = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("patienttoken", "", {
      expires: new Date(Date.now()),
      httpOnly: true
  }).json({
      success: true,
      message: "Pateint logged out successfully"
  });
});
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar is Required", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format Not supported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    department
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !department
  ) {
    return next(new ErrorHandler("Please fill full form. All fields are required", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
  }

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log("Cloudinary error:", cloudinaryResponse.error || "unknown Cloudinary Error");
    return next(new ErrorHandler("Error uploading image to Cloudinary", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    department,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  });

  res.status(200).json({
    success: true,
    message: "New Doctor registered successfully",
    doctor
  });
});
