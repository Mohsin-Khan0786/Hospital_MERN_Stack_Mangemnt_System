import { Message } from "../models/messageSchema.js";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errormiddlewares.js"; // Ensure this path is correct

export const sendmessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form. All fields are required", 400));
  }
  
  await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});
export const  getAllMessages=catchAsyncErrors(async (req,res,next)=>{
  const messages=await Message.find();
  res.status(200).json({success:true,
    messages});
 
})
