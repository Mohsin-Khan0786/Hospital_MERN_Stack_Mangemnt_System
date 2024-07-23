import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js";
import catchAsyncErrors from "./catchAsyncError.js";
import ErrorHandler from "./errormiddlewares.js";
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler('Admin Not authenticated', 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'Admin') {
        return next(new ErrorHandler(`${req.user.role} Not authorized for this resource`, 403));
    }
    next();
});

export const isPatientAuthenticated=catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler('Pateint Not authinticated',400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role!=='Patient'){
        return next(new ErrorHandler(`${req.user.role}Not authorized for this resources`,403));
    }
    next();


})

