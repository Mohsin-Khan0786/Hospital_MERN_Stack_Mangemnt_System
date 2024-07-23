import {catchAsyncErrors} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errormiddlewares.js';
import { Appointment } from '../models/appointmentSchema.js';
// import { User } from '../models/userSchema.js';
import User from '../models/userSchema.js';

export const postAppointment=catchAsyncErrors(async (req,res,next)=>{
    const{ firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        nic,
        role,
        appointment_Date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address


    }=req.body;
    if(!firstName||
       !lastName||
       !email||
       !phone||
       !gender||
       !dob||
       !nic||
       !role||
       !appointment_Date||
       !department||
       !doctor_firstName||
       !doctor_lastName||
       !address
       ) return next(new ErrorHandler("Please fill all the fields",400));

       const isConflict= await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctor_Department:department



       })
       if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found",404))
       }
       if(isConflict>1){
        return next(new ErrorHandler("Doctor conflict !Please  contact througgh email or phone",404))

       }
       const doctorId=isConflict[0]._id;
       const patientId=req.user._id;
       const appointment=  await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            gender,
            dob,
            nic,
            role,
            appointment_Date,
            department,
            doctor:{
                firstName:doctor_firstName,
                lastName:doctor_lastName,
            },
            hasVisited,
            address,
            doctorId,
            patientId
            })
            res.status(201).json({success:true,message:"Appointment Send Successfully!",
                appointment,
            })
           
            
})
export const getAllAppointments=catchAsyncErrors(async (req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({success:true,message:"All Appointments",appointments})
})
export const updateAppointments=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    let appointment=await appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",404))
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({success:true,message:"Appointment status updated successfully!",appointment})
})

export const deleteAppointment=catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params;
    let appointment=await appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",404))
    }
    await appointment.remove();
    res.status(200).json({success:true,message:"Appointment deleted successfully!"})
})
